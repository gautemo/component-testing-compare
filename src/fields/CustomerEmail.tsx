import { MailOutlined } from '@ant-design/icons'
import { Alert, Input } from 'antd'
import { setCustomerEmail, useStoreSnap } from '../formState'
import { validateEmail } from '../formValidation'

export function CustomerEmail() {
  const snap = useStoreSnap()
  const validation = validateEmail(snap.customer.email.value)
  return (
    <div>
      <label>
        <span>Email</span>
        <Input
          onChange={(e) => setCustomerEmail({ value: e.target.value })}
          onBlur={() => setCustomerEmail({ displayValidation: true })}
          style={{ width: 300 }}
          prefix={<MailOutlined />}
        />
      </label>
      {snap.customer.email.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
