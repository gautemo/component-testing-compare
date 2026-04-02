import { expect, test } from 'vitest'
import { AppProvider } from '../AppProvider'
import { render } from 'vitest-browser-react'
import { InsuranceCoverages } from './InsuranceCoverages'

test('should display require yearly driving length', async () => {
  const screen = await render(
    <AppProvider>
      <InsuranceCoverages />
    </AppProvider>,
  )
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Select yearly driving length to calculate prices',
  )
})
