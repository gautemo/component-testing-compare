import { test, expect } from '@playwright/experimental-ct-react'
import { Coverage } from './Coverage'
import { AppProvider } from '../AppProvider'

test('should be disabled if blocked', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} blocked />
    </AppProvider>,
  )
  await expect(component.getByRole('radio')).toBeDisabled()
})

test('should show price if not blocked', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} />
    </AppProvider>,
  )
  await expect(component.getByText('100 kr/mnd')).toBeAttached()
})

test('should not show price if blocked', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} blocked />
    </AppProvider>,
  )
  await expect(component.getByText('100 kr/mnd')).not.toBeAttached()
})
