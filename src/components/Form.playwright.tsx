import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from './AppProvider'
import { Form } from './Form'

test('should navigate to next steps', async ({ mount, page }) => {
  const component = await mount(
    <AppProvider>
      <Form />
    </AppProvider>,
  )

  // Customer
  await expect(component.getByTestId('customer-step')).toBeVisible()
  await component.getByTestId('phonenumber').getByRole('spinbutton').fill('12345678')
  await component.getByTestId('email').getByRole('textbox').fill('test@example.com')
  await component.getByRole('searchbox').fill('11111111111')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByTestId('customer-card')).toBeAttached()
  await component.getByRole('button', { name: 'Next' }).click()

  // Vehicle
  await expect(component.getByTestId('vehicle-step')).toBeVisible()
  await component.getByRole('searchbox').fill('AB1234')
  await component.getByRole('searchbox').press('Enter')
  await component.getByRole('spinbutton').fill('100')
  await expect(component.getByTestId('vehicle-card')).toBeAttached()
  await component.getByRole('button', { name: 'Next' }).click()

  // Insurance
  await expect(component.getByTestId('insurance-step')).toBeVisible()
  await component.getByRole('combobox').click()
  await page.getByText('5 000 km', { exact: true }).click()
  await component.getByRole('radio', { name: 'Kasko pluss' }).click()
  await component.getByRole('button', { name: 'Next' }).click()

  // Summary
  await expect(component.getByTestId('summary-step')).toBeVisible()
})
