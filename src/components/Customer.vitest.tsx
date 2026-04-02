import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import { AppProvider } from './AppProvider'
import { Customer } from './Customer'
import { commands, userEvent } from 'vitest/browser'

test('should display required on all inputs if next click right away', async () => {
  const screen = await render(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  await userEvent.click(screen.getByRole('button', { name: 'Next' }))
  await expect
    .element(screen.getByTestId('customer-search').getByRole('alert'))
    .toHaveTextContent('Required')
  await expect
    .element(screen.getByTestId('phonenumber').getByRole('alert'))
    .toHaveTextContent('Required')
  await expect.element(screen.getByTestId('email').getByRole('alert')).toHaveTextContent('Required')
})

test('should populate phonenumber if customer search has that data and input is empty', async () => {
  const screen = await render(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  commands.mockResponse('http://localhost:3000/customer/*', {
    json: {
      name: 'Donald Duck',
      age: 25,
      phonenumber: '87654321',
    },
  })
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect
    .element(screen.getByTestId('phonenumber').getByRole('spinbutton'))
    .toHaveValue('87654321')
})

test('should not populate phonenumber if customer search has that data and input has value', async () => {
  const screen = await render(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  commands.mockResponse('http://localhost:3000/customer/*', {
    json: {
      name: 'Donald Duck',
      age: 25,
      phonenumber: '87654321',
    },
  })
  await userEvent.type(screen.getByTestId('phonenumber').getByRole('spinbutton'), '1')
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect.element(screen.getByTestId('customer-card')).toBeInTheDocument()
  await expect.element(screen.getByTestId('phonenumber').getByRole('spinbutton')).toHaveValue('1')
})

test('should populate email if customer search has that data and input is empty', async () => {
  const screen = await render(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  commands.mockResponse('http://localhost:3000/customer/*', {
    json: {
      name: 'Donald Duck',
      age: 25,
      email: 'test@example.com',
    },
  })
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect
    .element(screen.getByTestId('email').getByRole('textbox'))
    .toHaveValue('test@example.com')
})

test('should not populate email if customer search has that data and input has value', async () => {
  const screen = await render(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  commands.mockResponse('http://localhost:3000/customer/*', {
    json: {
      name: 'Donald Duck',
      age: 25,
      email: 'test@example.com',
    },
  })
  await userEvent.type(screen.getByTestId('email').getByRole('textbox'), 'a')
  await userEvent.type(screen.getByRole('searchbox'), '11111111111{enter}')
  await expect.element(screen.getByTestId('customer-card')).toBeInTheDocument()
  await expect.element(screen.getByTestId('email').getByRole('textbox')).toHaveValue('a')
})
