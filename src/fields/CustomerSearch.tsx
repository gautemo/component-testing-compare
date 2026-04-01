import { UserOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { Alert, Spin } from 'antd'
import { validateSsn } from '../formValidation'
import { useCustomerQuery } from '../hooks/useCustomerQuery'
import { useEffect } from 'react'
import { useStore } from '../AppProvider'

export function CustomerSearch() {
  const { useSnap, setCustomerSsn, setCustomerPhonenumber, setCustomerEmail } = useStore()
  const snap = useSnap()
  const validation = validateSsn(snap.customer.ssn.value)
  const query = useCustomerQuery(snap.customer.ssn.value, validation.success)

  useEffect(() => {
    if (query.isSuccess) {
      if (!snap.customer.phonenumber.value) {
        setCustomerPhonenumber({ value: query.data.phonenumber })
      }
      if (!snap.customer.email.value) {
        setCustomerEmail({ value: query.data.email })
      }
    }
  }, [query.isSuccess])

  return (
    <div>
      <label>
        <span>Social security number</span>
        <Search onSearch={setCustomerSsn} prefix={<UserOutlined />} />
      </label>
      {snap.customer.ssn.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
      {query.isPending && validation.success && (
        <Spin description="Finding customer data" size="small" />
      )}
      {query.isError && <Alert title="Could not find customer" type="warning" />}
      {query.isSuccess && (
        <div className="card" data-testid="customer-card">
          <img
            src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${snap.customer.ssn.value}`}
            alt="Avatar"
            height="48"
            width="48"
          />
          <dl>
            <dt>Name:</dt>
            <dd>{query.data.name}</dd>
            <dt>Age:</dt>
            <dd>{query.data.age}</dd>
          </dl>
        </div>
      )}
    </div>
  )
}
