import { expect, test } from 'vitest'
import { AppProvider } from '../AppProvider'
import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { InsuranceCoverage } from './InsuranceCoverage'

test('should display require yearly driving length', async () => {
  const screen = await render(
    <AppProvider>
      <InsuranceCoverage />
    </AppProvider>,
  )
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Select yearly driving length to calculate prices',
  )
})
