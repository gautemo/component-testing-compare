import { CarOutlined, CarTwoTone } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { Alert, Spin } from 'antd'
import { validateRegistrationNumber } from '../formValidation'
import { useVehicleQuery } from '../hooks/useVehicleQuery'
import { useStore } from '../AppProvider'

export function VehicleSearch() {
  const { useSnap, setVehicleRegistrationNumber } = useStore()
  const snap = useSnap()
  const validation = validateRegistrationNumber(snap.vehicle.registrationNumber.value)
  const query = useVehicleQuery(snap.vehicle.registrationNumber.value, validation.success)

  return (
    <div>
      <label>
        <span>Registration number</span>
        <Search onSearch={setVehicleRegistrationNumber} prefix={<CarOutlined />} />
      </label>
      {snap.vehicle.registrationNumber.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
      {query.isPending && validation.success && (
        <Spin description="Finding vehicle data" size="small" />
      )}
      {query.isError && <Alert title="Could not find vehicle" type="warning" />}
      {query.isSuccess && (
        <div className="card">
          <CarTwoTone style={{ fontSize: 48 }} />
          <dl>
            <dt>Car:</dt>
            <dd>{query.data.description}</dd>
            <dt>Year:</dt>
            <dd>{query.data.year}</dd>
          </dl>
        </div>
      )}
    </div>
  )
}
