import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from './AppProvider'
import { Customer } from './Customer'

test('should display required on all inputs if next click right away', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  await component.getByRole('button', { name: 'Next' }).click()
  await expect(component.getByTestId('customer-search').getByRole('alert')).toHaveText('Required')
  await expect(component.getByTestId('phonenumber').getByRole('alert')).toHaveText('Required')
  await expect(component.getByTestId('email').getByRole('alert')).toHaveText('Required')
})

test('should populate phonenumber if customer search has that data and input is empty', async ({
  mount,
  page,
}) => {
  await page.route('http://localhost:3000/customer/*', (route) =>
    route.fulfill({
      json: {
        name: 'Donald Duck',
        age: 25,
        phonenumber: '87654321',
      },
    }),
  )
  const component = await mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByTestId('phonenumber').getByRole('spinbutton')).toHaveValue('87654321')
})

test('should not populate phonenumber if customer search has that data and input has value', async ({
  mount,
  page,
}) => {
  await page.route('http://localhost:3000/customer/*', (route) =>
    route.fulfill({
      json: {
        name: 'Donald Duck',
        age: 25,
        phonenumber: '87654321',
      },
    }),
  )
  const component = await mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  await component.getByTestId('phonenumber').getByRole('spinbutton').fill('1')
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByTestId('customer-card')).toBeAttached()
  await expect(component.getByTestId('phonenumber').getByRole('spinbutton')).toHaveValue('1')
})

test('should populate email if customer search has that data and input is empty', async ({
  mount,
  page,
}) => {
  await page.route('http://localhost:3000/customer/*', (route) =>
    route.fulfill({
      json: {
        name: 'Donald Duck',
        age: 25,
        email: 'test@example.com',
      },
    }),
  )
  const component = await mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByTestId('email').getByRole('textbox')).toHaveValue('test@example.com')
})

test('should not populate email if customer search has that data and input has value', async ({
  mount,
  page,
}) => {
  await page.route('http://localhost:3000/customer/*', (route) =>
    route.fulfill({
      json: {
        name: 'Donald Duck',
        age: 25,
        email: 'test@example.com',
      },
    }),
  )
  const component = await mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  await component.getByTestId('email').getByRole('textbox').fill('a')
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByTestId('customer-card')).toBeAttached()
  await expect(component.getByTestId('email').getByRole('textbox')).toHaveValue('a')
})
