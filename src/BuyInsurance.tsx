import { Confetti } from '@neoconfetti/react'
import { Alert, Button } from 'antd'
import { useBuyInsurance } from './hooks/useBuyInsurance'

export function BuyInsurance() {
  const buyMutation = useBuyInsurance()

  return (
    <>
      <Button
        type="primary"
        onClick={() => buyMutation.mutate()}
        loading={buyMutation.isPending}
        disabled={buyMutation.isSuccess}
      >
        Buy
      </Button>
      {buyMutation.isError && <Alert type="error" title="Failed to buy insurance" />}
      {buyMutation.isSuccess && (
        <>
          <Alert title="Thank you for the purchase!" type="success" showIcon />
          <div className="confetti" data-testid="confetti">
            <Confetti />
            <Confetti duration={5000} particleShape="mix" />
            <Confetti duration={3000} />
          </div>
        </>
      )}
    </>
  )
}
