import { CarOutlined, CheckSquareOutlined, FormOutlined, UserOutlined } from '@ant-design/icons'
import { Steps } from 'antd'
import { useState } from 'react'

export function App() {
  const [step, setStep] = useState(0)
  return (
    <>
      <header>
        <h1>Car insurance for you</h1>
      </header>
      <main>
        <div className="container">
          <Steps
            current={step}
            items={[
              {
                title: 'Customer',
                icon: <UserOutlined />,
              },
              {
                title: 'Vehicle',
                icon: <CarOutlined />,
              },
              {
                title: 'Insurance',
                icon: <FormOutlined />,
              },
              {
                title: 'Summary',
                icon: <CheckSquareOutlined />,
              },
            ]}
          />
          content
        </div>
      </main>
      <footer>
        <p>If you need help, call us!</p>
      </footer>
    </>
  )
}
