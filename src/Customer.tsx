import { Button } from 'antd'
import { CustomerSearch } from './fields/CustomerSearch'
import { CustomerEmail } from './fields/CustomerEmail'
import { CustomerPhonenumber } from './fields/CustomerPhonenumber'
import { useStore } from './AppProvider'

export function Customer() {
  const { nextStep } = useStore()
  return (
    <fieldset>
      <legend>Customer</legend>
      <CustomerSearch />
      <CustomerPhonenumber />
      <CustomerEmail />
      <Button type="primary" onClick={nextStep}>
        Next
      </Button>
    </fieldset>
  )
}
