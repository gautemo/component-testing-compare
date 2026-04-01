import { useMutation } from '@tanstack/react-query'
import { useStore } from '../components/AppProvider'

export function useBuyInsurance() {
  const snap = useStore().useSnap()
  const payload = {
    customer: {
      ssn: snap.customer.ssn.value,
      phonenumber: snap.customer.phonenumber.value,
      email: snap.customer.email.value,
    },
    vehicle: {
      registrationNumber: snap.vehicle.registrationNumber.value,
      mileage: snap.vehicle.mileage.value,
    },
    insurance: {
      yearlyDrivingLength: snap.insurance.yearlyDrivingLength,
      coverageId: snap.insurance.coverageId,
    },
  }
  return useMutation({
    async mutationFn() {
      const response = await fetch('http://localhost:3000/insurance', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error('unable to buy insurance')
      }
      return true
    },
  })
}
