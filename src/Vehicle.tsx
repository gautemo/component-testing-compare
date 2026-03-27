import { Button } from 'antd'
import { VehicleSearch } from './fields/VehicleSearch'
import { VehicleMileage } from './fields/VehicleMileage'
import { nextStep } from './formState'

export function Vehicle() {
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
