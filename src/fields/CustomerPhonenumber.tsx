import { PhoneOutlined } from '@ant-design/icons'
import { Alert, InputNumber } from 'antd'
import { validatePhonenumber } from '../formValidation'
import { useStore } from '../AppProvider'

export function CustomerPhonenumber() {
  const { useSnap, setCustomerPhonenumber } = useStore()
  const snap = useSnap()
  const validation = validatePhonenumber(snap.customer.phonenumber.value)
  return (
    <div data-testid="phonenumber">
      <label>
        <span>Phone number</span>
        <InputNumber
          value={snap.customer.phonenumber.value}
          controls={false}
          onChange={(value) => setCustomerPhonenumber({ value: value?.toString() ?? '' })}
          onBlur={() => setCustomerPhonenumber({ displayValidation: true })}
          prefix={<PhoneOutlined />}
          style={{ width: 'auto' }}
        />
      </label>
      {snap.customer.phonenumber.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
