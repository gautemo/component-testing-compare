import { Button } from 'antd'
import { VehicleSearch } from './fields/VehicleSearch'
import { VehicleMileage } from './fields/VehicleMileage'
import { useStore } from './AppProvider'

export function Vehicle() {
  const { nextStep } = useStore()
  return (
    <fieldset>
      <legend>Vehicle</legend>
      <VehicleSearch />
      <VehicleMileage />
      <Button type="primary" onClick={nextStep}>
        Next
      </Button>
    </fieldset>
  )
}
