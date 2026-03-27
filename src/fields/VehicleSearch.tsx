import { CarOutlined, CarTwoTone } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useQuery } from '@tanstack/react-query'
import { setVehicleRegistrationNumber, useStoreSnap } from '../formState'
import { Alert } from 'antd'
import { validateRegistrationNumber } from '../formValidation'

export function VehicleSearch() {
  const snap = useStoreSnap()
  const validation = validateRegistrationNumber(snap.vehicle.registrationNumber.value)
  const query = useQuery({
    queryKey: ['vehicle', snap.vehicle.registrationNumber.value],
    async queryFn(): Promise<{ description: string; year: number }> {
      const response = await fetch(
        `http://localhost:3000/vehicle/${snap.vehicle.registrationNumber.value}`,
      )
      return response.json()
    },
    enabled: validation.success,
  })

  return (
    <div>
      <label>
        <span>Registration number</span>
        <Search
          onSearch={setVehicleRegistrationNumber}
          prefix={<CarOutlined />}
          style={{ width: 300 }}
        />
      </label>
      {snap.vehicle.registrationNumber.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
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
