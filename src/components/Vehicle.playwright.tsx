import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from './AppProvider'
import { Vehicle } from './Vehicle'

test('should display required on all inputs if next click right away', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <Vehicle />
    </AppProvider>,
  )
  await component.getByRole('button', { name: 'Next' }).click()
  await expect(component.getByTestId('vehicle-search').getByRole('alert')).toHaveText('Required')
  await expect(component.getByTestId('mileage').getByRole('alert')).toHaveText('Required')
})
