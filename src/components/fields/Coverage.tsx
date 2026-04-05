import { Card, Radio } from 'antd'
import { useStore } from '../AppProvider'
import clsx from 'clsx'

type Props = {
  id: string
  name: string
  price: number
  description: string
  blocked?: boolean
}

export function Coverage(props: Props) {
  const { useSnap } = useStore()
  const snap = useSnap()
  return (
    <Card
      size="small"
      className={clsx('coverage-card', { selected: snap.insurance.coverageId === props.id })}
    >
      <Radio
        value={props.id}
        disabled={props.blocked}
        style={{ flexDirection: 'row' }}
        className="coverage-card"
      >
        <div className="coverage-label">
          <strong>{props.name}</strong>
          {props.blocked ? <span></span> : <span>{props.price} kr/mnd</span>}
          <p>{props.description}</p>
        </div>
      </Radio>
    </Card>
  )
}
