export function validateCustomer(values: { ssn: string; phonenumber: string; email: string }) {
  return validateSsn(values.ssn).success
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
