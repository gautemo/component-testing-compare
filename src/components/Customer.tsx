import { Button } from 'antd'
import { CustomerSearch } from './fields/CustomerSearch'
import { CustomerEmail } from './fields/CustomerEmail'
import { CustomerPhonenumber } from './fields/CustomerPhonenumber'
import { useStore } from './AppProvider'

export function Customer() {
  const { completeStep } = useStore()
  return (
    <fieldset data-testid="customer-step">
      <legend>Customer</legend>
      <CustomerSearch />
      <CustomerPhonenumber />
      <CustomerEmail />
      <Button type="primary" onClick={() => completeStep('customer')}>
        Next
      </Button>
    </fieldset>
  )
}
