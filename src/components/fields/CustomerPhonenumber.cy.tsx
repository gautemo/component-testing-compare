import { AppProvider } from '../AppProvider'
import { CustomerPhonenumber } from './CustomerPhonenumber'

it('should display required alert after blur if empty', () => {
  cy.mount(
    <AppProvider>
      <CustomerPhonenumber />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input').focus().blur()
  cy.get('[role=alert]').should('have.text', 'Required')
})

it('should display invalid alert after blur if invalid phone number', () => {
  cy.mount(
    <AppProvider>
      <CustomerPhonenumber />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input').type('1234').blur()
  cy.get('[role=alert]').should('have.text', 'Should be 8 digits')
})
