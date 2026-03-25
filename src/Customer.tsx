import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber } from 'antd'
import { CustomerSearchField } from './CustomerSearchField'

export function Customer() {
  return (
    <fieldset>
      <legend>Customer</legend>
      <CustomerSearchField />
      <label>
        <span>Phone number</span>
        <InputNumber
          controls={false}
          onChange={() => {}}
          prefix={<PhoneOutlined />}
          style={{ width: 300 }}
        />
      </label>
      <label>
        <span>Email</span>
        <Input onChange={() => {}} style={{ width: 300 }} prefix={<MailOutlined />} />
      </label>
      <Button type="primary">Next</Button>
    </fieldset>
  )
}
