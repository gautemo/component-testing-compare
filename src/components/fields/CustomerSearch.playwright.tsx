import { test, expect } from '@playwright/experimental-ct-react'
import { CustomerSearch } from './CustomerSearch'
import { AppProvider } from '../AppProvider'

test('should display customer data', async ({ mount, page }) => {
  await page.route('http://localhost:3000/customer/*', (route) =>
    route.fulfill({
      json: {
        name: 'Donald Duck',
        age: 25,
      },
    }),
  )
  const component = await mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  const customerCard = component.getByTestId('customer-card')
  await expect(customerCard).toContainText('Donald Duck')
  await expect(customerCard).toContainText('25')
})

test('should display not found customer', async ({ mount, page }) => {
  await page.route('http://localhost:3000/customer/*', (route) =>
    route.fulfill({
      status: 404,
    }),
  )
  const component = await mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByRole('alert')).toHaveText('Could not find customer')
})

test('should display required alert if empty search', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByRole('alert')).toHaveText('Required')
})

test('should display invalid alert after blur if invalid ssn', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('searchbox').fill('123456789')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByRole('alert')).toHaveText('Invalid format')
})

test('should display pending message', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByText('Finding customer data')).toBeVisible()
})
