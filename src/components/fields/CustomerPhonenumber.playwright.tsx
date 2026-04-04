import { test, expect } from '@playwright/experimental-ct-react'
import { CustomerPhonenumber } from './CustomerPhonenumber'
import { AppProvider } from '../AppProvider'

test('should display required alert after blur if empty', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerPhonenumber />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('spinbutton').click()
  await component.getByRole('spinbutton').blur()
  await expect(component.getByRole('alert')).toHaveText('Required')
})

test('should display invalid alert after blur if invalid phone number', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerPhonenumber />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('spinbutton').fill('1234')
  await component.getByRole('spinbutton').blur()
  await expect(component.getByRole('alert')).toHaveText('Should be 8 digits')
})
