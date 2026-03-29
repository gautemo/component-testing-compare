import { useQuery } from '@tanstack/react-query'

export function useVehicleQuery(registrationNumber: string, enabled: boolean) {
  return useQuery({
    queryKey: ['vehicle', registrationNumber],
    async queryFn(): Promise<{ description: string; year: number }> {
      const response = await fetch(`http://localhost:3000/vehicle/${registrationNumber}`)
      return response.json()
    },
    enabled,
  })
}
