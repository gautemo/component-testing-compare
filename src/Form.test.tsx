import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { AppProvider } from './AppProvider'
import { Form } from './Form'
import { userEvent } from 'vitest/browser'

test('should navigate to next steps', async () => {
  const screen = await render(
    <AppProvider>
      <Form />
    </AppProvider>,
  )

  // Customer
  await expect.element(screen.getByTestId('customer-step')).toBeVisible()
  await userEvent.type(screen.getByTestId('phonenumber').getByRole('spinbutton'), '12345678')
  await userEvent.type(screen.getByTestId('email').getByRole('textbox'), 'test@example.com')
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect.element(screen.getByTestId('customer-card')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))

  // Vehicle
  await expect.element(screen.getByTestId('vehicle-step')).toBeVisible()
  await userEvent.type(screen.getByRole('searchbox'), 'AB1234{enter}')
  await userEvent.type(screen.getByRole('spinbutton'), '100')
  await expect.element(screen.getByTestId('vehicle-card')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))

  // Insurance
  await expect.element(screen.getByTestId('insurance-step')).toBeVisible()
  await userEvent.click(screen.getByRole('combobox'))
  await userEvent.click(screen.getByText('5 000 km', { exact: true }))
  await userEvent.click(screen.getByRole('radio', { name: 'Kasko pluss' }))
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))

  // Summary
  await expect.element(screen.getByTestId('summary-step')).toBeVisible()
})
