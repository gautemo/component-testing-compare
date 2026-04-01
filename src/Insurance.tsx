import { Button } from 'antd'
import { InsuranceCoverage } from './fields/InsuranceCoverage'
import { InsuranceYearlyDrivingLength } from './fields/InsuranceYearlyDrivingLength'
import { useStore } from './AppProvider'

export function Insurance() {
  const { completeStep } = useStore()
  return (
    <fieldset data-testid="insurance-step">
      <legend>Insurance</legend>
      <InsuranceYearlyDrivingLength />
      <InsuranceCoverage />
      <Button type="primary" onClick={() => completeStep('insurance')}>
        Next
      </Button>
    </fieldset>
  )
}
