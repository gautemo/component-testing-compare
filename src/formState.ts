import { proxy, useSnapshot } from 'valtio'
import { validateCustomer, validateInsurance, validateVehicle } from './formValidation'

const store = proxy({
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
})

export function useStoreSnap() {
  return useSnapshot(store)
}

export function setCustomerSsn(value: string) {
  store.customer.ssn = { value, displayValidation: true }
}
export function setCustomerPhonenumber(options: { value?: string; displayValidation?: true }) {
  if (options.value !== undefined) {
    store.customer.phonenumber.value = options.value
  }
  if (options.displayValidation) {
    store.customer.phonenumber.displayValidation = true
  }
}
export function setCustomerEmail(options: { value?: string; displayValidation?: true }) {
  if (options.value !== undefined) {
    store.customer.email.value = options.value
  }
  if (options.displayValidation) {
    store.customer.email.displayValidation = true
  }
}

export function setVehicleRegistrationNumber(value: string) {
  store.vehicle.registrationNumber = { value, displayValidation: true }
}
export function setVehicleMileage(options: { value?: number | null; displayValidation?: true }) {
  if (options.value !== undefined) {
    store.vehicle.mileage.value = options.value
  }
  if (options.displayValidation) {
    store.vehicle.mileage.displayValidation = true
  }
}

export function setInsuranceMileage(value: number) {
  store.insurance.yearlyDrivingLength = value
}
export function setInsuranceCoverage(id: string) {
  store.insurance.coverageId = id
}

export function nextStep() {
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
}
