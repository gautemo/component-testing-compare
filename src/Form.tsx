import { CarOutlined, CheckSquareOutlined, FormOutlined, UserOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import { Customer } from './Customer'
import { useState } from 'react'

export function Form() {
  const [step, setStep] = useState(0)
  return (
    <div className="container">
      <Steps
        orientation="vertical"
        size="default"
        current={step}
        items={[
          {
            title: 'Customer',
            icon: <UserOutlined />,
            style: { height: 70 },
          },
          {
            title: 'Vehicle',
            icon: <CarOutlined />,
            style: { height: 70 },
          },
          {
            title: 'Insurance',
            icon: <FormOutlined />,
            style: { height: 70 },
          },
          {
            title: 'Summary',
            icon: <CheckSquareOutlined />,
            style: { height: 70 },
          },
        ]}
      />
      {step === 0 && <Customer />}
    </div>
  )
}
