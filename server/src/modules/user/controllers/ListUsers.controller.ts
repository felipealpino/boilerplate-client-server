import { ApiExecuteCallbackAppConfig } from '@/bootstrap/Boot';

export const ListUserController = async (args: ApiExecuteCallbackAppConfig) => {
  const { request } = args;
  return { result: { version: 'v1', data: [request.getQueryParams()] } };
};
