import { BootMiddleware } from '@/middlewares/Boot.middleware';
import { ListUserController } from '@/modules/user/controllers/ListUsers.controller';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(
    async function (fastify) {
      fastify.get('/', { preHandler: [BootMiddleware] }, async (request) => {
        return request.app?.apiExecute(ListUserController);
      });
    },
    { prefix: '/users' }
  );
};
