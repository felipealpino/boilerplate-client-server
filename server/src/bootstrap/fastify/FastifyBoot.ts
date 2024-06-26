import { FastifyRequestHandler } from '@/bootstrap/fastify/FastifyRequestHandler';
import { ApiExecuteCallback, IBootInterface } from '@/bootstrap/interfaces/BootInterface';
import { ErrorHandling, ErrorHandlingResponse } from '@/errors/ErrorHandling';
import { FastifyReply, FastifyRequest } from 'fastify';

export class FastifyBoot implements IBootInterface {
  request: FastifyRequestHandler;
  reply: FastifyReply;

  constructor(config: { request: FastifyRequest; reply: FastifyReply }) {
    this.request = new FastifyRequestHandler(config.request);
    this.reply = config.reply;
  }

  public async apiExecute(cb: ApiExecuteCallback) {
    try {
      const now = Date.now();
      console.time(`Function Time ${now}`);
      const response = await cb({ request: this.request });
      console.timeEnd(`Function Time ${now}`);
      this.reply.status(200).send(response.result);
    } catch (error: unknown) {
      this.catchError(error);
    }
  }

  public catchError(error: unknown) {
    console.error(error);
    if (error instanceof ErrorHandling) {
      const { statusCode, errors, message, name } = error as ErrorHandlingResponse;
      const code = statusCode ? statusCode : 500;
      return this.reply.status(code).send({ message, name, statusCode, errors });
    } else if (error instanceof Error) {
      return this.reply.status(500).send({ message: error.message, name: 'Error' });
    } else {
      return this.reply.status(500).send({
        message: String(error),
        name: 'Error não mapeado',
        errors: ['O Error não caiu em nenhuma exception existente.'],
      });
    }
  }
}
