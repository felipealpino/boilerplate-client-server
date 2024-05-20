import { FastifyBoot } from '@/bootstrap/fastify/FastifyBoot';
import { FastifyReply, FastifyRequest } from 'fastify';

export function FastifyBootMiddleware(request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) {
  const app = new FastifyBoot({ request, reply });
  try {
    request.app = app;
    done();
  } catch (error: unknown) {
    app.catchError(error);
    // done();
  }
}
