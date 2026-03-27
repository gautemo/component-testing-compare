import { PhoneOutlined } from '@ant-design/icons'
import { Alert, InputNumber } from 'antd'
import { setCustomerPhonenumber, useStoreSnap } from '../formState'
import { validatePhonenumber } from '../formValidation'

export function CustomerPhonenumber() {
  const snap = useStoreSnap()
  const validation = validatePhonenumber(snap.customer.phonenumber.value)
  return (
    <div>
      <label>
        <span>Phone number</span>
        <InputNumber
          controls={false}
          onChange={(value) => setCustomerPhonenumber({ value: value?.toString() ?? '' })}
          onBlur={() => setCustomerPhonenumber({ displayValidation: true })}
          prefix={<PhoneOutlined />}
          style={{ width: 300 }}
        />
      </label>
      {snap.customer.phonenumber.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
    </div>
  )
}
