import { test, expect } from '@playwright/experimental-ct-react'
import { AppProvider } from '../AppProvider'
import { InsuranceCoverages } from './InsuranceCoverages'

test('should display require yearly driving length', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <InsuranceCoverages />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).toHaveText(
    'Select yearly driving length to calculate prices',
  )
})
