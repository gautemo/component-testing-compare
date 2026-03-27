import { Button } from 'antd'
import { CustomerSearch } from './fields/CustomerSearch'
import { nextStep } from './formState'
import { CustomerEmail } from './fields/CustomerEmail'
import { CustomerPhonenumber } from './fields/CustomerPhonenumber'

export function Customer() {
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
