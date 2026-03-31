import { useBuyInsurance } from './hooks/useBuyInsurance'
import { Alert, Button } from 'antd'
import { useCustomerQuery } from './hooks/useCustomerQuery'
import { CarTwoTone, SafetyOutlined } from '@ant-design/icons'
import { useVehicleQuery } from './hooks/useVehicleQuery'
import { useCoveragesQuery } from './hooks/useCoveragesQuery'
import { Confetti } from '@neoconfetti/react'
import { useStore } from './AppProvider'

export function Summary() {
  const snap = useStore().useSnap()
  const buyMutation = useBuyInsurance()

  const customerQuery = useCustomerQuery(snap.customer.ssn.value, true)
  const vehicleQuery = useVehicleQuery(snap.vehicle.registrationNumber.value, true)
  const coveragesQuery = useCoveragesQuery()
  const coverage = coveragesQuery.data?.find((c) => c.id === snap.insurance.coverageId)

  if (
    !customerQuery.isSuccess ||
    !vehicleQuery.isSuccess ||
    !coveragesQuery.isSuccess ||
    !coverage
  ) {
    throw new Error('invalid state')
  }

  return (
    <div className="summary">
      <h2>Summary</h2>
      <h3>Customer</h3>
      <div className="card">
        <img
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${snap.customer.ssn.value}`}
          alt="Avatar"
          height="48"
          width="48"
        />
        <dl>
          <dt>Name:</dt>
          <dd>{customerQuery.data.name}</dd>
          <dt>Age:</dt>
          <dd>{customerQuery.data.age}</dd>
          <dt>Phone number:</dt>
          <dd>{snap.customer.phonenumber.value}</dd>
          <dt>Email:</dt>
          <dd>{snap.customer.email.value}</dd>
        </dl>
      </div>
      <h3>Vehicle</h3>
      <div className="card">
        <CarTwoTone style={{ fontSize: 48 }} />
        <dl>
          <dt>Car:</dt>
          <dd>{vehicleQuery.data.description}</dd>
          <dt>Registration number:</dt>
          <dd>{snap.vehicle.registrationNumber.value}</dd>
          <dt>Year:</dt>
          <dd>{vehicleQuery.data.year}</dd>
          <dt>Mileage:</dt>
          <dd>{snap.vehicle.mileage.value}</dd>
        </dl>
      </div>
      <h3>Insurance</h3>
      <div className="card">
        <SafetyOutlined style={{ fontSize: 48 }} />
        <dl>
          <dt>Yearly driving length:</dt>
          <dd>{snap.insurance.yearlyDrivingLength} km</dd>
          <dt>Coverage:</dt>
          <dd>{coverage.name}</dd>
          <dt>Price:</dt>
          <dd>{coverage.price} kr/mnd</dd>
        </dl>
      </div>
      <Button
        type="primary"
        onClick={() => buyMutation.mutate()}
        loading={buyMutation.isPending}
        disabled={buyMutation.isSuccess}
      >
        Buy
      </Button>
      {buyMutation.isError && <Alert type="error" title="Failed to buy insurance" />}
      {buyMutation.isSuccess && (
        <>
          <Alert title="Thank you for the purchase!" type="success" showIcon />
          <div className="confetti">
            <Confetti />
            <Confetti duration={5000} particleShape="mix" />
            <Confetti duration={3000} />
          </div>
        </>
      )}
    </div>
  )
}
