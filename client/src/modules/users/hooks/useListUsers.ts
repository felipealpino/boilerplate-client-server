import { useToast } from '@/components/ui/use-toast';
import { AxiosFactory } from '@/factories/AxiosFactory';
import { CommonArgs } from '@/modules/users/types';
import { useQuery } from '@tanstack/react-query';

const factory = new AxiosFactory();

type ListUsersResponse = { user: { name: string } };
type ListUsersArgs = CommonArgs & { filters?: Record<string, any> };

export const useListUsers = (args: ListUsersArgs = {}) => {
  const { toast } = useToast();
  const { options, filters } = args;

  const listUsers = async (filters?: ListUsersArgs['filters']) => {
    try {
      const response = await factory.get<ListUsersResponse>('v1/users', { params: filters });
      return response.data;
    } catch (error: any) {
      toast({
        title: error.message,
        description: error.errors,
        variant: 'destructive',
      });
    }
  };

  return useQuery<Awaited<ReturnType<typeof listUsers>>>({
    queryKey: ['users', filters],
    queryFn: async () => await listUsers(filters),
    ...options,
  });
};
