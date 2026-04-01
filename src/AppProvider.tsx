import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useContext, useRef, type ReactElement } from 'react'
import { proxy, useSnapshot } from 'valtio'
import { validateCustomer, validateInsurance, validateVehicle } from './formValidation'
import './index.css'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: Infinity,
    },
  },
})

const initialStore = {
  step: 0,
  customer: {
    ssn: { value: '', displayValidation: false },
    phonenumber: { value: '', displayValidation: false },
    email: { value: '', displayValidation: false },
  },
  vehicle: {
    registrationNumber: { value: '', displayValidation: false },
    mileage: { value: null as number | null, displayValidation: false },
  },
  insurance: {
    yearlyDrivingLength: null as number | null,
    coverageId: '',
    displayValidation: false,
  },
}

const StoreContext = createContext<typeof initialStore | null>(null)

export function AppProvider(props: { children: ReactElement }) {
  const store = useRef(proxy(structuredClone(initialStore))).current

  return (
    <QueryClientProvider client={queryClient}>
      <StoreContext.Provider value={store}>{props.children}</StoreContext.Provider>
    </QueryClientProvider>
  )
}

export function useStore() {
  const store = useContext(StoreContext)
  if (store === null) {
    throw new Error('can only use useStore inside AppProvider')
  }

  return {
    useSnap() {
      return useSnapshot(store)
    },
    setCustomerSsn(value: string) {
      store.customer.ssn = { value, displayValidation: true }
    },
    setCustomerPhonenumber(options: { value?: string; displayValidation?: true }) {
      if (options.value !== undefined) {
        store.customer.phonenumber.value = options.value
      }
      if (options.displayValidation) {
        store.customer.phonenumber.displayValidation = true
      }
    },
    setCustomerEmail(options: { value?: string; displayValidation?: true }) {
      if (options.value !== undefined) {
        store.customer.email.value = options.value
      }
      if (options.displayValidation) {
        store.customer.email.displayValidation = true
      }
    },
    setVehicleRegistrationNumber(value: string) {
      store.vehicle.registrationNumber = { value, displayValidation: true }
    },
    setVehicleMileage(options: { value?: number | null; displayValidation?: true }) {
      if (options.value !== undefined) {
        store.vehicle.mileage.value = options.value
      }
      if (options.displayValidation) {
        store.vehicle.mileage.displayValidation = true
      }
    },
    setYearlyDrivingLength(value: number) {
      store.insurance.yearlyDrivingLength = value
    },
    setInsuranceCoverage(id: string) {
      store.insurance.coverageId = id
    },
    nextStep() {
      if (
        store.step === 0 &&
        !validateCustomer({
          ssn: store.customer.ssn.value,
          email: store.customer.email.value,
          phonenumber: store.customer.phonenumber.value,
        })
      ) {
        store.customer.ssn.displayValidation = true
        store.customer.phonenumber.displayValidation = true
        store.customer.email.displayValidation = true
        return
      }
      if (
        store.step === 1 &&
        !validateVehicle({
          registrationNumber: store.vehicle.registrationNumber.value,
          mileage: store.vehicle.mileage.value,
        })
      ) {
        store.vehicle.registrationNumber.displayValidation = true
        store.vehicle.mileage.displayValidation = true
        return
      }
      if (
        store.step === 2 &&
        !validateInsurance({
          mileage: store.insurance.yearlyDrivingLength,
          coverageId: store.insurance.coverageId,
        })
      ) {
        store.insurance.displayValidation = true
        return
      }
      store.step++
    },
  }
}
