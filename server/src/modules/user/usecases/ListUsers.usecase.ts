import { ApiExecuteCallbackReturn } from '@/bootstrap/interfaces/BootInterface';
import { ListUserControllerOptions } from '@/modules/user/controllers/ListUsers.controller';

type ListUserUseCaseExecute = (args: { payload: ListUserControllerOptions }) => Promise<ApiExecuteCallbackReturn>;
type ListUserUseCaseInterface = (args: Record<string, any>) => { execute: ListUserUseCaseExecute };

export const ListUserUseCase: ListUserUseCaseInterface = () => ({
  async execute({ payload }) {
    return { result: { version: 'v1', data: payload } };
  },
});
