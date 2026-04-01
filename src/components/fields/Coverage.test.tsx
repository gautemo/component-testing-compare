import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { Coverage } from './Coverage'
import { AppProvider } from '../AppProvider'

test('should be disabled if blocked', async () => {
  const screen = await render(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} blocked />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('radio')).toBeDisabled()
})

test('should show price if not blocked', async () => {
  const screen = await render(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} />
    </AppProvider>,
  )
  await expect.element(screen.getByText('100 kr/mnd')).toBeInTheDocument()
})

test('should not show price if blocked', async () => {
  const screen = await render(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} blocked />
    </AppProvider>,
  )
  await expect.element(screen.getByText('100 kr/mnd')).not.toBeInTheDocument()
})
