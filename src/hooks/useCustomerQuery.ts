import { useQuery } from '@tanstack/react-query'

export function useCustomerQuery(ssn: string, enabled: boolean) {
  return useQuery({
    queryKey: ['customer', ssn],
    async queryFn(): Promise<{ name: string; age: number; phonenumber?: string; email?: string }> {
      const response = await fetch(`http://localhost:3000/customer/${ssn}`)
      return response.json()
    },
    enabled,
  })
}
