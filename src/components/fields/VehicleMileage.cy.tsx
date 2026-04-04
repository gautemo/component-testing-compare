import { AppProvider } from '../AppProvider'
import { VehicleMileage } from './VehicleMileage'

it('should display required alert after blur if empty', () => {
  cy.mount(
    <AppProvider>
      <VehicleMileage />
    </AppProvider>,
  )
  cy.get('[role="alert"]').should('not.exist')
  cy.get('[role="spinbutton"]').focus().blur()
  cy.get('[role="alert"]').should('have.text', 'Required')
})
