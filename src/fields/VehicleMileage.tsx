import { Alert, InputNumber } from 'antd'
import { setVehicleMileage, useStoreSnap } from '../formState'
import { validateMileage } from '../formValidation'

export function VehicleMileage() {
  const snap = useStoreSnap()
  const validation = validateMileage(snap.vehicle.mileage.value)
  return (
    <div>
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
