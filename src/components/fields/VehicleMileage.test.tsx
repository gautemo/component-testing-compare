import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { VehicleMileage } from './VehicleMileage'
import { userEvent } from 'vitest/browser'
import { AppProvider } from '../AppProvider'

test('should display required alert after blur if empty', async () => {
  const screen = await render(
    <AppProvider>
      <VehicleMileage />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await screen.getByRole('spinbutton').click()
  await userEvent.tab()
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Required')
})
