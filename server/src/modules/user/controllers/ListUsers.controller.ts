import { BootController } from '@/bootstrap/interfaces/BootInterface';
import { ListUserUseCase } from '@/modules/user/usecases/ListUsers.usecase';
import { parseFactory } from '@/utils/parseFactory';
import { z } from 'zod';

export type ListUserControllerOptions = z.infer<typeof ListUserControllerSchema>;
const ListUserControllerSchema = z.object({
  user: z.object({
    name: z.string(),
    profiles: z.array(z.string()),
  }),
});
export const ListUserController: BootController = async (args) => {
  const { request } = args;
  const payload = parseFactory(ListUserControllerSchema)(request.getQueryParams());
  return ListUserUseCase({}).execute({ payload });
};
