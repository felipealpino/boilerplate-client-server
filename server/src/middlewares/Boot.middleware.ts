import { Boot } from '@/bootstrap/Boot';
import { FastifyReply, FastifyRequest } from 'fastify';

export function BootMiddleware(request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) {
  const app = new Boot({ request, reply });
  try {
    request.app = app;
    done();
  } catch (error: unknown) {
    app.catchError(error);
    // done();
  }
}
