import { CarOutlined, CheckSquareOutlined, FormOutlined, UserOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import { Customer } from './Customer'
import { Insurance } from './Insurance'
import { Vehicle } from './Vehicle'
import { useStoreSnap } from './formState'
import { Summary } from './Summary'

export function Form() {
  const snap = useStoreSnap()
  return (
    <div className="container">
      <Steps
        orientation="vertical"
        current={snap.step}
        items={[
          {
            title: 'Customer',
            icon: <UserOutlined />,
            style: { height: 60 },
          },
          {
            title: 'Vehicle',
            icon: <CarOutlined />,
            style: { height: 60 },
          },
          {
            title: 'Insurance',
            icon: <FormOutlined />,
            style: { height: 60 },
          },
          {
            title: 'Summary',
            icon: <CheckSquareOutlined />,
            style: { height: 60 },
          },
        ]}
      />
      {snap.step === 0 && <Customer />}
      {snap.step === 1 && <Vehicle />}
      {snap.step === 2 && <Insurance />}
      {snap.step === 3 && <Summary />}
    </div>
  )
}
