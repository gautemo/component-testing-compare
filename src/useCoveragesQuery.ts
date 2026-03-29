import { useQuery } from '@tanstack/react-query'
import { useStoreSnap } from './formState'
import { hash } from 'ohash'

export function useCoveragesQuery() {
  const snap = useStoreSnap()
  const payload = {
    customerSsn: snap.customer.ssn,
    vehicle: {
      registrationNumber: snap.vehicle.registrationNumber,
      mileage: snap.vehicle.mileage,
    },
    yearlyDrivingLength: snap.insurance.yearlyDrivingLength,
  }
  return useQuery<{ id: string; name: string; price: number; description: string }[]>({
    queryKey: ['coverages', hash(payload)],
    async queryFn() {
      const response = await fetch('http://localhost:3000/coverages', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      return response.json()
    },
    enabled: !!payload.yearlyDrivingLength,
  })
}
