import { Button } from 'antd'
import { InsuranceCoverage } from './fields/InsuranceCoverage'
import { InsuranceYearlyDrivingLength } from './fields/InsuranceYearlyDrivingLength'
import { useStore } from './AppProvider'

export function Insurance() {
  const { nextStep } = useStore()
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
