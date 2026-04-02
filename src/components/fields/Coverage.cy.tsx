import { AppProvider } from '../AppProvider'
import { Coverage } from './Coverage'

it('should be disabled if blocked', () => {
  cy.mount(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} blocked />
    </AppProvider>,
  )
  cy.get('input[type="radio"]').should('be.disabled')
})

it('should show price if not blocked', () => {
  cy.mount(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} />
    </AppProvider>,
  )
  cy.contains('100 kr/mnd').should('exist')
})

it('should not show price if blocked', () => {
  cy.mount(
    <AppProvider>
      <Coverage id={'1'} name={'Full'} price={100} description={'Buy me'} blocked />
    </AppProvider>,
  )
  cy.contains('100 kr/mnd').should('not.exist')
})
