import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { AppProvider } from './AppProvider'
import { Insurance } from './Insurance'
import { commands, userEvent } from 'vitest/browser'

test('should display alert about needing to select yearly driving length to show coverages', async () => {
  const screen = await render(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  await expect
    .element(screen.getByRole('alert'))
    .toHaveTextContent('Select yearly driving length to calculate prices')
})

test('should show coverages after selecting yearly driving length', async () => {
  const screen = await render(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )

  commands.mockResponse('http://localhost:3000/coverages', {
    json: [
      { id: '1', name: 'Basic', price: 299, description: 'Basic coverage' },
      { id: '2', name: 'Full', price: 499, description: 'Full coverage' },
    ],
  })

  await userEvent.click(screen.getByRole('combobox'))
  await userEvent.click(screen.getByText('5 000 km', { exact: true }))

  await expect.element(screen.getByRole('radio', { name: /Basic/ })).toBeInTheDocument()
  await expect.element(screen.getByRole('radio', { name: /Full/ })).toBeInTheDocument()
})

test('should display could not get coverages', async () => {
  const screen = await render(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )

  commands.mockResponse('http://localhost:3000/coverages', {
    status: 404,
  })

  await userEvent.click(screen.getByRole('combobox'))
  await userEvent.click(screen.getByText('5 000 km', { exact: true }))
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Failed to get coverage prices')
})

test('should display required inputs if next clicked right away', async () => {
  const screen = await render(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))
  await expect
    .element(screen.getByTestId('yearly-driving-length-validation-error'))
    .toHaveTextContent('Required')
  await expect
    .element(screen.getByTestId('coverage-validation-error'))
    .toHaveTextContent('Required')
})
