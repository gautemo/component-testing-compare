import { AppProvider } from './AppProvider'
import { Insurance } from './Insurance'

it('should display alert about needing to select yearly driving length to show coverages', () => {
  cy.mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('have.text', 'Select yearly driving length to calculate prices')
})

it('should show coverages after selecting yearly driving length', () => {
  cy.intercept('POST', 'http://localhost:3000/coverages', {
    body: [
      { id: '1', name: 'Basic', price: 299, description: 'Basic coverage' },
      { id: '2', name: 'Full', price: 499, description: 'Full coverage' },
    ],
  })
  cy.mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  cy.get('[role=combobox]').click()
  cy.contains('5 000 km').click()
  cy.get('label').contains(/Basic/).should('exist')
  cy.get('label').contains(/Full/).should('exist')
})

it('should display could not get coverages', () => {
  cy.intercept('POST', 'http://localhost:3000/coverages', {
    statusCode: 404,
  })
  cy.mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  cy.get('[role=combobox]').click()
  cy.contains('5 000 km').click()
  cy.get('[role=alert]').should('have.text', 'Failed to get coverage prices')
})

it('should display required inputs if next clicked right away', () => {
  cy.mount(
    <AppProvider>
      <Insurance />
    </AppProvider>,
  )
  cy.get('button').contains('Next').click()
  cy.get('[data-testid=yearly-driving-length-validation-error]').should('have.text', 'Required')
  cy.get('[data-testid=coverage-validation-error]').should('have.text', 'Required')
})
