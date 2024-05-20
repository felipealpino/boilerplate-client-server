import { useToast } from '@/components/ui/use-toast';
import { AxiosFactory } from '@/factories/AxiosFactory';
import { CommonArgs } from '@/modules/users/types';
import { useQuery } from '@tanstack/react-query';

const factory = new AxiosFactory();
type ListUsersArgs = CommonArgs & { filters?: Record<string, any> };

export const useListUsers = (args: ListUsersArgs = {}) => {
  const { toast } = useToast();
  const { options, filters } = args;

  const ListUsers = async (args: ListUsersArgs['filters']) => {
    try {
      const response = await factory.get('v1/users', { params: args });
      return response.data;
    } catch (error: any) {
      toast({
        title: error.message,
        description: error.errors,
        variant: 'destructive',
      });
    }
  };

  return useQuery({
    queryKey: ['users', filters],
    queryFn: async () => await ListUsers(filters),
    ...options,
  });
};
