import { UseQueryOptions } from '@tanstack/react-query'

export type CommonArgs = { options?: UseQueryOptions }

export interface User {
  id: number
  name: string
}
