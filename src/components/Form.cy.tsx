import { AppProvider } from './AppProvider'
import { Form } from './Form'

it('should navigate to next steps', () => {
  cy.mount(
    <AppProvider>
      <Form />
    </AppProvider>,
  )

  // Customer
  cy.get('[data-testid=customer-step]').should('be.visible')
  cy.get('[data-testid=phonenumber]').find('input').type('12345678')
  cy.get('[data-testid=email]').find('input').type('test@example.com')
  cy.get('input[type="search"]').type('11111111111{enter}')
  cy.get('[data-testid=customer-card]').should('exist')
  cy.get('button').contains('Next').click()

  // Vehicle
  cy.get('[data-testid=vehicle-step]').should('be.visible')
  cy.get('input[type="search"]').type('AB1234{enter}')
  cy.get('input[role="spinbutton"]').type('100')
  cy.get('[data-testid=vehicle-card]').should('exist')
  cy.get('button').contains('Next').click()

  // Insurance
  cy.get('[data-testid=insurance-step]').should('be.visible')
  cy.get('[role=combobox]').click()
  cy.contains('5 000 km').click()
  cy.contains('Kasko pluss').click()
  cy.get('button').contains('Next').click()

  // Summary
  cy.get('[data-testid=summary-step]').should('be.visible')
})
