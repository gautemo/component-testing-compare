import { UserOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'
import { useQuery } from '@tanstack/react-query'
import { setCustomerSsn, useStoreSnap } from '../formState'
import { Alert } from 'antd'
import { validateSsn } from '../formValidation'

export function CustomerSearch() {
  const snap = useStoreSnap()
  const validation = validateSsn(snap.customer.ssn.value)
  const query = useQuery({
    queryKey: ['customer', snap.customer.ssn.value],
    async queryFn(): Promise<{ name: string; age: number; phonenumber: string; email: string }> {
      const response = await fetch(`http://localhost:3000/customer/${snap.customer.ssn.value}`)
      return response.json()
    },
    enabled: validation.success,
  })

  return (
    <div>
      <label>
        <span>Social security number</span>
        <Search onSearch={setCustomerSsn} width={500} prefix={<UserOutlined />} />
      </label>
      {snap.customer.ssn.displayValidation && !validation.success && (
        <Alert title={validation.errorMessage} type="warning" showIcon />
      )}
      {query.isSuccess && (
        <div className="card">
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
