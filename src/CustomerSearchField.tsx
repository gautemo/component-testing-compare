import { UserOutlined } from '@ant-design/icons'
import Search from 'antd/es/input/Search'

export function CustomerSearchField() {
  return (
    <label>
      <span>Social security number</span>
      <Search onSearch={() => {}} width={500} prefix={<UserOutlined />} style={{ width: 300 }} />
    </label>
  )
}
