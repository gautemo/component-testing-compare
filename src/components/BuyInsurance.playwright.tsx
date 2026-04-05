import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from './AppProvider'
import { BuyInsurance } from './BuyInsurance'

test('should display buy failed', async ({ mount, page }) => {
  await page.route('http://localhost:3000/insurance', (route) =>
    route.fulfill({
      status: 500,
    }),
  )
  await mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await page.getByRole('button', { name: 'Buy' }).click()
  await expect(page.getByRole('alert')).toHaveText('Failed to buy insurance')
})

test('should display success alert after buy', async ({ mount, page }) => {
  await mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await page.getByRole('button', { name: 'Buy' }).click()
  await expect(page.getByRole('alert')).toHaveText('Thank you for the purchase!')
})

test('should display confetti after buy', async ({ mount, page }) => {
  await mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await page.getByRole('button', { name: 'Buy' }).click()
  await expect(page.getByTestId('confetti')).toBeAttached()
})

test('should disable buy button after buy', async ({ mount, page }) => {
  await mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await page.getByRole('button', { name: 'Buy' }).click()
  await expect(page.getByRole('button', { name: 'Buy' })).toBeDisabled()
})
