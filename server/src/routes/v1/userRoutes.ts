import { CONNECTED_USERS } from '@/index';
import { BootMiddleware } from '@/middlewares/Boot.middleware';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(
    async function (fastify) {
      fastify.get('/', { preHandler: [BootMiddleware] }, async (request) => {
        return request.app?.apiExecute(async () => {
          const users = Array.from(CONNECTED_USERS.keys());
          console.log('users:', users);
          return { result: { version: 'v1', data: users } };
        });
      });
    },
    { prefix: '/users' }
  );
};
