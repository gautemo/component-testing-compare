import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { CustomerPhonenumber } from './CustomerPhonenumber'
import { userEvent } from 'vitest/browser'
import { AppProvider } from '../AppProvider'

test('should display required alert after blur if empty', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerPhonenumber />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await screen.getByRole('spinbutton').click()
  await userEvent.tab()
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Required')
})

test('should display invalid alert after blur if invalid phone number', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerPhonenumber />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await userEvent.type(screen.getByRole('spinbutton'), '1234')
  await userEvent.tab()
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Should be 8 digits')
})
