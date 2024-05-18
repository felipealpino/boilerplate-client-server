import { AxiosFactory } from '@/factories/AxiosFactory'
import { CommonArgs, User } from '@/modules/users/types'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const factory = new AxiosFactory()

type GetUserArgs = { id: number } & CommonArgs
export const useGetUser = (rest: GetUserArgs) => {
  const { id, ...options } = rest
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response: AxiosResponse<User> = await factory.get(`/v1/users/${id}`)
      return response.data
    },
    ...options,
  })
}
