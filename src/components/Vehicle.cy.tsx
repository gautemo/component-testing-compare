import { AppProvider } from './AppProvider'
import { Vehicle } from './Vehicle'

it('should display required on all inputs if next click right away', () => {
  cy.mount(
    <AppProvider>
      <Vehicle />
    </AppProvider>,
  )
  cy.get('button').contains('Next').click()
  cy.get('[data-testid=vehicle-search]').find('[role=alert]').should('have.text', 'Required')
  cy.get('[data-testid=mileage]').find('[role=alert]').should('have.text', 'Required')
})
