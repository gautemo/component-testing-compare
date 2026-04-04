import { AppProvider } from '../AppProvider'
import { VehicleSearch } from './VehicleSearch'

it('should display vehicle data', () => {
  cy.intercept('GET', 'http://localhost:3000/vehicle/*', {
    body: {
      description: 'Audi A4',
      year: 2004,
    },
  })
  cy.mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('AB1234{enter}')
  cy.get('[data-testid=vehicle-card]').should('contain.text', 'Audi A4')
  cy.get('[data-testid=vehicle-card]').should('contain.text', '2004')
})

it('should display not found vehicle', () => {
  cy.intercept('GET', 'http://localhost:3000/vehicle/*', {
    statusCode: 404,
  })
  cy.mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  cy.get('input[type="search"]').type('AB1234{enter}')
  cy.get('[role=alert]').should('have.text', 'Could not find vehicle')
})

it('should display required alert if empty search', () => {
  cy.mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input[type="search"]').type('{enter}')
  cy.get('[role=alert]').should('have.text', 'Required')
})

it('should display invalid alert after blur if invalid registration number', () => {
  cy.mount(
    <AppProvider>
      <VehicleSearch />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input[type="search"]').type('123{enter}')
  cy.get('[role=alert]').should('have.text', 'Invalid format')
})
