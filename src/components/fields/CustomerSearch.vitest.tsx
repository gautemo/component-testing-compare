import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { CustomerSearch } from './CustomerSearch'
import { userEvent, commands } from 'vitest/browser'
import { AppProvider } from '../AppProvider'

test('should display customer data', async () => {
  commands.mockResponse('http://localhost:3000/customer/*', {
    json: {
      name: 'Donald Duck',
      age: 25,
    },
  })
  const screen = await render(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  const customerCard = screen.getByTestId('customer-card')
  await expect.element(customerCard).toHaveTextContent('Donald Duck')
  await expect.element(customerCard).toHaveTextContent('25')
})

test('should display not found customer', async () => {
  commands.mockResponse('http://localhost:3000/customer/*', {
    status: 404,
  })
  const screen = await render(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Could not find customer')
})

test('should display required alert if empty search', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await userEvent.type(screen.getByRole('searchbox'), '{enter}')
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Required')
})

test('should display invalid alert after blur if invalid ssn', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await expect.element(screen.getByRole('alert')).not.toBeInTheDocument()
  await userEvent.type(screen.getByRole('searchbox'), '123456789{enter}')
  await expect.element(screen.getByRole('alert')).toHaveTextContent('Invalid format')
})

test('should display pending message', async () => {
  const screen = await render(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect.element(screen.getByText('Finding customer data')).toBeVisible()
})
