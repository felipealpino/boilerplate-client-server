import { ListUserController } from '@/modules/user/controllers/ListUsersController';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(
    async function (fastify) {
      fastify.get('/', { preHandler: [] }, async (request) => {
        return request.app?.apiExecute(ListUserController);
      });
    },
    { prefix: '/users' }
  );
};
