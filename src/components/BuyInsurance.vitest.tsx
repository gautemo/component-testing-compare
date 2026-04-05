import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { AppProvider } from './AppProvider'
import { BuyInsurance } from './BuyInsurance'
import { commands, userEvent } from 'vitest/browser'

test('should display buy failed', async () => {
  const screen = await render(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  commands.mockResponse('http://localhost:3000/insurance', { status: 500 })
  await userEvent.click(screen.getByRole('button', { name: 'Buy' }))
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Failed to buy insurance')
})

test('should display success alert after buy', async () => {
  const screen = await render(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Buy' }))
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Thank you for the purchase!')
})

test('should display confetti after buy', async () => {
  const screen = await render(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Buy' }))
  await expect.element(screen.getByTestId('confetti')).toBeInTheDocument()
})

test('should disable buy button after buy', async () => {
  const screen = await render(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Buy' }))
  await expect.element(screen.getByRole('button', { name: 'Buy' })).toBeDisabled()
})

test('should show pending button while buying', async () => {
  const screen = await render(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Buy' }))
  await expect
    .element(screen.getByRole('button', { name: 'Buy' }).getByLabelText('loading'))
    .toBeVisible()
})
