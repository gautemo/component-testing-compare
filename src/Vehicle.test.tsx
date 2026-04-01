import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { AppProvider } from './AppProvider'
import { Vehicle } from './Vehicle'
import { userEvent } from 'vitest/browser'

test('should display required on all inputs if next click right away', async () => {
  const screen = await render(
    <AppProvider>
      <Vehicle />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))
  await expect
    .element(screen.getByTestId('vehicle-search').getByRole('alert'))
    .toHaveTextContent('Required')
  await expect
    .element(screen.getByTestId('mileage').getByRole('alert'))
    .toHaveTextContent('Required')
})
