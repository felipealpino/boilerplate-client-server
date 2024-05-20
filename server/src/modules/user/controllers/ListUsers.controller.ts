import { BootController } from '@/bootstrap/Boot';

export const ListUserController: BootController = async (args) => {
  const { request } = args;
  return { result: { version: 'v1', data: [request.getQueryParams()] } };
};
