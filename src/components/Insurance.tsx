import { Button } from 'antd'
import { InsuranceCoverages } from './fields/InsuranceCoverages'
import { InsuranceYearlyDrivingLength } from './fields/InsuranceYearlyDrivingLength'
import { useStore } from './AppProvider'

export function Insurance() {
  const { completeStep } = useStore()
  return (
    <fieldset data-testid="insurance-step">
      <legend>Insurance</legend>
      <InsuranceYearlyDrivingLength />
      <InsuranceCoverages />
      <Button type="primary" onClick={() => completeStep('insurance')}>
        Next
      </Button>
    </fieldset>
  )
}
