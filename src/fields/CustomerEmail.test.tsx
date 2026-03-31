import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { CustomerEmail } from './CustomerEmail'
import { userEvent } from 'vitest/browser'
import { AppProvider } from '../AppProvider'

test('should display required alert after blur if empty', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerEmail />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await screen.getByRole('textbox').click()
  await userEvent.tab()
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Required')
})

test('should display invalid alert after blur if invalid email', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerEmail />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await userEvent.type(screen.getByRole('textbox'), 'example@')
  await userEvent.tab()
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Inavlid email')
})
