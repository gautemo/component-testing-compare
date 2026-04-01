import { Alert, InputNumber } from 'antd'
import { validateMileage } from '../formValidation'
import { useStore } from '../AppProvider'

export function VehicleMileage() {
  const { useSnap, setVehicleMileage } = useStore()
  const snap = useSnap()
  const validation = validateMileage(snap.vehicle.mileage.value)
  return (
    <div data-testid="mileage">
      <label>
        <span>Mileage</span>
        <InputNumber
          controls={false}
          min={0}
          max={1_000_000}
          onChange={(value: number | null) => setVehicleMileage({ value })}
          onBlur={() => setVehicleMileage({ displayValidation: true })}
          suffix="km"
          style={{ width: 'auto' }}
        />
      </label>
      {snap.vehicle.mileage.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
