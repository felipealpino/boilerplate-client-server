import { FastifyRequestHandler } from '@/bootstrap/FastifyRequestHandler';
import { GenericObject } from '@/types';
import { FastifyReply, FastifyRequest } from 'fastify';

type ApiExecuteCallbackAppConfig = { [key: string]: any };
type ApiExecuteCallbackReturn = { result: GenericObject<any>; [key: string]: any };
type ApiExecuteCallback = (appConfig: ApiExecuteCallbackAppConfig) => Promise<ApiExecuteCallbackReturn>;
type BootContructor = { request: FastifyRequest; reply: FastifyReply };

export class Boot {
  request: FastifyRequestHandler;
  reply: FastifyReply;

  constructor(config: BootContructor) {
    this.request = new FastifyRequestHandler(config.request);
    this.reply = config.reply;
  }

  public async apiExecute(cb: ApiExecuteCallback) {
    try {
      const now = Date.now();
      console.time(`Function Time ${now}`);
      const response = await cb({ hello: 'world' });
      console.timeEnd(`Function Time ${now}`);
      this.reply.status(200).send(response.result);
    } catch (error: unknown) {
      if (error instanceof Error) console.log('eeeeerror', error.message);
      this.reply.status(500).send({ hello: 'bad - world!' });
    }
  }
}
