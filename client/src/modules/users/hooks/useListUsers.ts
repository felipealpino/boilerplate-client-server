import { AxiosFactory } from '@/factories/AxiosFactory'
import { CommonArgs, User } from '@/modules/users/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const factory = new AxiosFactory()

type ListUsersArgs = CommonArgs
export const useListUsers = (args: ListUsersArgs = {}) => {
  const { options } = args
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response: AxiosResponse<User[]> = await factory.get('v1/users')
      return response.data
    },
    ...options,
  })
}
