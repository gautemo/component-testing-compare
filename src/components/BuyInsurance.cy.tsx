import { AppProvider } from './AppProvider'
import { BuyInsurance } from './BuyInsurance'

it('should display buy failed', () => {
  cy.intercept('POST', 'http://localhost:3000/insurance', {
    statusCode: 500,
  })
  cy.mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  cy.get('button').click()
  cy.get('[role=alert]').should('have.text', 'Failed to buy insurance')
})

it('should display success alert after buy', () => {
  cy.mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  cy.get('button').click()
  cy.get('[role=alert]').should('have.text', 'Thank you for the purchase!')
})

it('should display confetti after buy', () => {
  cy.mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  cy.get('button').click()
  cy.get('[data-testid=confetti]').should('exist')
})

it('should disable buy button after buy', () => {
  cy.mount(
    <AppProvider>
      <BuyInsurance />
    </AppProvider>,
  )
  cy.get('button').click()
  cy.get('button').should('be.disabled')
})
