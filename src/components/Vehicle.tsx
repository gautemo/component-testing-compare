import { Button } from 'antd'
import { VehicleSearch } from './fields/VehicleSearch'
import { VehicleMileage } from './fields/VehicleMileage'
import { useStore } from './AppProvider'

export function Vehicle() {
  const { completeStep } = useStore()
  return (
    <fieldset data-testid="vehicle-step">
      <legend>Vehicle</legend>
      <VehicleSearch />
      <VehicleMileage />
      <Button type="primary" onClick={() => completeStep('vehicle')}>
        Next
      </Button>
    </fieldset>
  )
}
