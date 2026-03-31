import { Alert, Card, Radio, Spin } from 'antd'
import { validateInsuranceCoverage } from '../formValidation'
import { useCoveragesQuery } from '../hooks/useCoveragesQuery'
import { useStore } from '../AppProvider'

export function InsuranceCoverage() {
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
            <Card
              key={coverage.id}
              size="small"
              style={{
                cursor: 'pointer',
                borderColor: snap.insurance.coverageId === coverage.id ? '#1677ff' : undefined,
              }}
            >
              <Radio value={coverage.id} style={{ flexDirection: 'row' }} className="coverage-card">
                <div className="coverage-label">
                  <strong>{coverage.name}</strong>
                  <span>{coverage.price} kr/mnd</span>
                  <p>{coverage.description}</p>
                </div>
              </Radio>
            </Card>
          ))}
        </Radio.Group>
      )}
      {snap.insurance.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
