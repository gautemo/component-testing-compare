import { proxy, subscribe, useSnapshot } from 'valtio'
import { validateCustomer } from './formValidation'

const store = proxy({
  step: 0,
  customer: {
    ssn: { value: '', displayValidation: false },
    phonenumber: { value: '', displayValidation: false },
    email: { value: '', displayValidation: false },
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
  store.step++
}

subscribe(store, () => console.log('state has changed to', store))
