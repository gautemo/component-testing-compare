import { test, expect } from '@playwright/experimental-ct-react'
import { CustomerEmail } from './CustomerEmail'
import { AppProvider } from '../AppProvider'

test('should display required alert after blur if empty', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerEmail />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('textbox').click()
  await component.getByRole('textbox').blur()
  await expect(component.getByRole('alert')).toHaveText('Required')
})

test('should display invalid alert after blur if invalid email', async ({ mount }) => {
  const component = await mount(
    <AppProvider>
      <CustomerEmail />
    </AppProvider>,
  )
  await expect(component.getByRole('alert')).not.toBeAttached()
  await component.getByRole('textbox').fill('example@')
  await component.getByRole('textbox').blur()
  await expect(component.getByRole('alert')).toHaveText('Inavlid email')
})
