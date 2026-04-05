import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { commands, userEvent } from 'vitest/browser'
import { AppProvider } from '../AppProvider'
import { VehicleSearch } from './VehicleSearch'

test('should display vehicle data', async () => {
  commands.mockResponse('http://localhost:3000/vehicle/*', {
    json: {
      description: 'Audi A4',
      year: 2004,
    },
  })
  const screen = await render(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await userEvent.type(screen.getByRole('searchbox'), 'AB1234{enter}')
  const vehicleCard = screen.getByTestId('vehicle-card')
  await expect.element(vehicleCard).toHaveTextContent('Audi A4')
  await expect.element(vehicleCard).toHaveTextContent('2004')
})

test('should display not found vehicle', async () => {
  commands.mockResponse('http://localhost:3000/vehicle/*', {
    status: 404,
  })
  const screen = await render(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await userEvent.type(screen.getByRole('searchbox'), 'AB1234{enter}')
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Could not find vehicle')
})

test('should display required alert if empty search', async () => {
  const screen = await render(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await userEvent.type(screen.getByRole('searchbox'), '{enter}')
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Required')
})

test('should display invalid alert after blur if invalid registration number', async () => {
  const screen = await render(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await userEvent.type(screen.getByRole('searchbox'), '123{enter}')
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Invalid format')
})

test('should display pending message', async () => {
  const screen = await render(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await userEvent.type(screen.getByRole('searchbox'), 'AB1234{enter}')
  await expect.element(screen.getByText('Finding vehicle data')).toBeVisible()
})
