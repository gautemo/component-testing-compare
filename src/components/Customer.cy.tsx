import { AppProvider } from './AppProvider'
import { Customer } from './Customer'

it('should display required on all inputs if next click right away', () => {
  cy.mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  cy.get('button').contains('Next').click()
  cy.get('[data-testid=customer-search]').find('[role=alert]').should('have.text', 'Required')
  cy.get('[data-testid=phonenumber]').find('[role=alert]').should('have.text', 'Required')
  cy.get('[data-testid=email]').find('[role=alert]').should('have.text', 'Required')
})

it('should populate phonenumber if customer search has that data and input is empty', () => {
  cy.intercept('GET', 'http://localhost:3000/customer/*', {
    body: {
      name: 'Donald Duck',
      age: 25,
      phonenumber: '87654321',
    },
  })
  cy.mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[data-testid=phonenumber]').find('input').should('have.value', '87654321')
})

it('should not populate phonenumber if customer search has that data and input has value', () => {
  cy.intercept('GET', 'http://localhost:3000/customer/*', {
    body: {
      name: 'Donald Duck',
      age: 25,
      phonenumber: '87654321',
    },
  })
  cy.mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  cy.get('[data-testid=phonenumber]').find('input').type('1')
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[data-testid=customer-card]').should('exist')
  cy.get('[data-testid=phonenumber]').find('input').should('have.value', '1')
})

it('should populate email if customer search has that data and input is empty', () => {
  cy.intercept('GET', 'http://localhost:3000/customer/*', {
    body: {
      name: 'Donald Duck',
      age: 25,
      email: 'test@example.com',
    },
  })
  cy.mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[data-testid=email]').find('input').should('have.value', 'test@example.com')
})

it('should not populate email if customer search has that data and input has value', () => {
  cy.intercept('GET', 'http://localhost:3000/customer/*', {
    body: {
      name: 'Donald Duck',
      age: 25,
      email: 'test@example.com',
    },
  })
  cy.mount(
    <AppProvider>
      <Customer />
    </AppProvider>,
  )
  cy.get('[data-testid=email]').find('input').type('a')
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[data-testid=customer-card]').should('exist')
  cy.get('[data-testid=email]').find('input').should('have.value', 'a')
})
