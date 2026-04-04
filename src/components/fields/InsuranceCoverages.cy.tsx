import { AppProvider } from '../AppProvider'
import { InsuranceCoverages } from './InsuranceCoverages'

it('should display require yearly driving length', () => {
  cy.mount(
    <AppProvider>
      <InsuranceCoverages />
    </AppProvider>,
  )
  cy.get('[role="alert"]').should('have.text', 'Select yearly driving length to calculate prices')
})
