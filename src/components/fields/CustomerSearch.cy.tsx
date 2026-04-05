import { AppProvider } from '../AppProvider'
import { CustomerSearch } from './CustomerSearch'

it('should display customer data', () => {
  cy.intercept('GET', 'http://localhost:3000/customer/*', {
    body: {
      name: 'Donald Duck',
      age: 25,
    },
  })
  cy.mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[data-testid=customer-card]').should('contain.text', 'Donald Duck')
  cy.get('[data-testid=customer-card]').should('contain.text', '25')
})

it('should display not found customer', () => {
  cy.intercept('GET', 'http://localhost:3000/customer/*', {
    statusCode: 404,
  })
  cy.mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[role=alert]').should('have.text', 'Could not find customer')
})

it('should display required alert if empty search', () => {
  cy.mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input[type="search"]').type('{enter}')
  cy.get('[role=alert]').should('have.text', 'Required')
})

it('should display invalid alert after blur if invalid ssn', () => {
  cy.mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input[type="search"]').type('123456789{enter}')
  cy.get('[role=alert]').should('have.text', 'Invalid format')
})

it('should display pending message', () => {
  cy.mount(
    <AppProvider>
      <CustomerSearch />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.contains('Finding customer data').should('be.visible')
})
