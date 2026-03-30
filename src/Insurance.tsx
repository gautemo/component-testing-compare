import { Button } from 'antd'
import { InsuranceCoverage } from './fields/InsuranceCoverage'
import { InsuranceYearlyDrivingLength } from './fields/InsuranceYearlyDrivingLength'
import { nextStep } from './formState'

export function Insurance() {
  return (
    <fieldset>
      <legend>Insurance</legend>
      <InsuranceYearlyDrivingLength />
      <InsuranceCoverage />
      <Button type="primary" onClick={nextStep}>
        Next
      </Button>
    </fieldset>
  )
}
