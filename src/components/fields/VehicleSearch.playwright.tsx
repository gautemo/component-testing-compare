import { test, expect } from '@playwright/experimental-ct-react'
import { VehicleSearch } from './VehicleSearch'
import { AppProvider } from '../AppProvider'

test('should display vehicle data', async ({ mount, page }) => {
  await page.route('http://localhost:3000/vehicle/*', (route) =>
    route.fulfill({
      json: {
        description: 'Audi A4',
        year: 2004,
      },
    }),
  )
  const component = await mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('AB1234')
  await component.getByRole('searchbox').press('Enter')
  const vehicleCard = component.getByTestId('vehicle-card')
  await expect(vehicleCard).toContainText('Audi A4')
  await expect(vehicleCard).toContainText('2004')
})

test('should display not found vehicle', async ({ mount, page }) => {
  await page.route('http://localhost:3000/vehicle/*', (route) =>
    route.fulfill({
      status: 404,
    }),
  )
  const component = await mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('AB1234')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByRole('alert')).toHaveText('Could not find vehicle')
})

test('should display required alert if empty search', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByRole('alert')).toHaveText('Required')
})

test('should display invalid alert after blur if invalid registration number', async ({
  mount,
}) => {
  const component = await mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('searchbox').fill('123')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByRole('alert')).toHaveText('Invalid format')
})

test('should display pending message', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  await component.getByRole('searchbox').fill('AB1234')
  await component.getByRole('searchbox').press('Enter')
  await expect(component.getByText('Finding vehicle data')).toBeVisible()
})
