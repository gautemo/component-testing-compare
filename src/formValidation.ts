import { queryClient } from './query'

export function validateCustomer(values: { ssn: string; phonenumber: string; email: string }) {
  return (
    validateSsn(values.ssn).success &&
    validatePhonenumber(values.phonenumber) &&
    validateEmail(values.email) &&
    !!queryClient.getQueryData(['customer', values.ssn])
  )
}

export function validateVehicle(values: { registrationNumber: string; mileage: number | null }) {
  return (
    validateRegistrationNumber(values.registrationNumber).success &&
    validateMileage(values.mileage).success &&
    !!queryClient.getQueryData(['vehicle', values.registrationNumber])
  )
}

export function validateRegistrationNumber(value: string) {
  const valid = /^[A-Z]{2}\d{4,5}$/i.test(value)
  return {
    success: valid,
    errorMessage: value.length === 0 ? 'Required' : !valid ? 'Invalid format' : undefined,
  }
}

export function validateMileage(value: number | null) {
  const valid = value !== null && value >= 0
  return {
    success: valid,
    errorMessage: !valid ? 'Required' : undefined,
  }
}

export function validateSsn(value: string) {
  return {
    success: value.length === 11,
    errorMessage:
      value.length === 0 ? 'Required' : value.length !== 11 ? 'Invalid format' : undefined,
  }
}

export function validatePhonenumber(value: string) {
  return {
    success: value.length === 8,
    errorMessage:
      value.length === 0 ? 'Required' : value.length !== 8 ? 'Should be 8 digits' : undefined,
  }
}

export function validateInsurance(values: { mileage: number | null; coverageId: string | null }) {
  return (
    validateYearlyDrivingLength(values.mileage).success &&
    validateInsuranceCoverage(values.coverageId).success
  )
}

export function validateYearlyDrivingLength(value: number | null) {
  return {
    success: !!value,
    errorMessage: !value ? 'Required' : undefined,
  }
}

export function validateInsuranceCoverage(value: string | null) {
  return {
    success: !!value,
    errorMessage: !value ? 'Required' : undefined,
  }
}

export function validateEmail(value: string) {
  const valid =
    /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i.test(
      value,
    )
  return {
    success: valid,
    errorMessage: value.length === 0 ? 'Required' : !valid ? 'Inavlid email' : undefined,
  }
}
