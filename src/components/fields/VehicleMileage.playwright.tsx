import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from '../AppProvider'
import { VehicleMileage } from './VehicleMileage'

test('should display required alert after blur if empty', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <VehicleMileage />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('spinbutton').click()
  await component.getByRole('spinbutton').blur()
  await expect(component.getByRole('alert')).toHaveText('Required')
})
