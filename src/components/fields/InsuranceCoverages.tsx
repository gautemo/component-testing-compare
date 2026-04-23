import { Alert, Radio, Spin } from 'antd'
import { validateInsuranceCoverage } from '../../formValidation'
import { useCoveragesQuery } from '../../hooks/useCoveragesQuery'
import { useStore } from '../AppProvider'
import { Coverage } from './Coverage'

export function InsuranceCoverages() {
  const { useSnap, setInsuranceCoverage } = useStore()
  const snap = useSnap()
  const validation = validateInsuranceCoverage(snap.insurance.coverageId)
  const query = useCoveragesQuery()

  return (
    <div>
      <p className="radio-group-header">Coverage</p>
      {!query.isEnabled && (
        <Alert title="Select yearly driving length to calculate prices" type="info" />
      )}
      {query.isPending && query.isEnabled && <Spin description="Calculating prices" size="small" />}
      {query.isError && <Alert title="Failed to get coverage prices" type="error" />}
      {query.isSuccess && (
        <Radio.Group
          onChange={(e) => setInsuranceCoverage(e.target.value)}
          style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          {query.data.map((coverage) => (
            <Coverage
              key={coverage.id}
              id={coverage.id}
              name={coverage.name}
              description={coverage.description}
              price={coverage.price}
              blocked={coverage.blocked}
            />
          ))}
        </Radio.Group>
      )}
      {snap.insurance.displayValidation && !validation.success && (
        <Alert
          title={validation.errorMessage}
          type="warning"
          showIcon
          data-testid="coverage-validation-error"
        />
      )}
    </div>
  )
}
