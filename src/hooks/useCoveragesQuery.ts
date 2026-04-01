import { useQuery } from '@tanstack/react-query'
import { hash } from 'ohash'
import { useStore } from '../components/AppProvider'

export function useCoveragesQuery() {
  const snap = useStore().useSnap()
  const payload = {
    customerSsn: snap.customer.ssn.value,
    vehicle: {
      registrationNumber: snap.vehicle.registrationNumber.value,
      mileage: snap.vehicle.mileage.value,
    },
    yearlyDrivingLength: snap.insurance.yearlyDrivingLength,
  }
  return useQuery<
    { id: string; name: string; price: number; description: string; blocked?: boolean }[]
  >({
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
