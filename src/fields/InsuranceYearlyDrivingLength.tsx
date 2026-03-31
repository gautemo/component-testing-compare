import { Alert, Select } from 'antd'
import { validateYearlyDrivingLength } from '../formValidation'
import { useStore } from '../AppProvider'

const mileageOptions = [5000, 8000, 10000, 12000, 14000, 18000, 25000].map((km) => ({
  value: km,
  label: `${km.toLocaleString('no-NO')} km`,
}))

export function InsuranceYearlyDrivingLength() {
  const { useSnap, setInsuranceMileage } = useStore()
  const snap = useSnap()
  const validation = validateYearlyDrivingLength(snap.insurance.yearlyDrivingLength)
  return (
    <div>
      <label>
        <span>Yearly driving length</span>
        <Select
          options={mileageOptions}
          onChange={(value: number) => setInsuranceMileage(value)}
          placeholder="Select yearly km"
        />
      </label>
      {snap.insurance.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
