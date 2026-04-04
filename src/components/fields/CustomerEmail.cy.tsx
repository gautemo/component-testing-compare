import { AppProvider } from '../AppProvider'
import { CustomerEmail } from './CustomerEmail'

it('should display required alert after blur if empty', () => {
  cy.mount(
    <AppProvider>
      <CustomerEmail />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input').click()
  cy.get('input').blur()
  cy.get('[role=alert]').should('have.text', 'Required')
})

it('should display invalid alert after blur if invalid email', () => {
  cy.mount(
    <AppProvider>
      <CustomerEmail />
    </AppProvider>,
  )
  cy.get('[role=alert]').should('not.exist')
  cy.get('input').type('example@')
  cy.get('input').blur()
  cy.get('[role=alert]').should('have.text', 'Inavlid email')
})
