import { MailOutlined } from '@ant-design/icons'
import { Alert, Input } from 'antd'
import { validateEmail } from '../../formValidation'
import { useStore } from '../AppProvider'

export function CustomerEmail() {
  const { useSnap, setCustomerEmail } = useStore()
  const snap = useSnap()
  const validation = validateEmail(snap.customer.email.value)
  return (
    <div data-testid="email">
      <label>
        <span>Email</span>
        <Input
          value={snap.customer.email.value}
          onChange={(e) => setCustomerEmail({ value: e.target.value })}
          onBlur={() => setCustomerEmail({ displayValidation: true })}
          prefix={<MailOutlined />}
        />
      </label>
      {snap.customer.email.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
