import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from './AppProvider'
import { Insurance } from './Insurance'

test('should display alert about needing to select yearly driving length to show coverages', async ({
  mount,
}) => {
  const component = await mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).toHaveText(
    'Select yearly driving length to calculate prices',
  )
})

test('should show coverages after selecting yearly driving length', async ({ mount, page }) => {
  await page.route('http://localhost:3000/coverages', (route) =>
    route.fulfill({
      json: [
        { id: '1', name: 'Basic', price: 299, description: 'Basic coverage' },
        { id: '2', name: 'Full', price: 499, description: 'Full coverage' },
      ],
    }),
  )
  const component = await mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  await component.getByRole('combobox').click()
  await page.getByText('5 000 km', { exact: true }).click()
  await expect(component.getByRole('radio', { name: /Basic/ })).toBeAttached()
  await expect(component.getByRole('radio', { name: /Full/ })).toBeAttached()
})

test('should display could not get coverages', async ({ mount, page }) => {
  await page.route('http://localhost:3000/coverages', (route) =>
    route.fulfill({
      status: 404,
    }),
  )
  const component = await mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  await component.getByRole('combobox').click()
  await page.getByText('5 000 km', { exact: true }).click()
  await expect(component.getByRole('alert')).toHaveText('Failed to get coverage prices')
})

test('should display required inputs if next clicked right away', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  await component.getByRole('button', { name: 'Next' }).click()
  await expect(component.getByTestId('yearly-driving-length-validation-error')).toHaveText(
    'Required',
  )
  await expect(component.getByTestId('coverage-validation-error')).toHaveText('Required')
})
