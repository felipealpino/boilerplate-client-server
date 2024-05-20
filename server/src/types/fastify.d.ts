import { FastifyBoot } from '@/bootstrap/fastify/FastifyBoot';
import 'fastify';
import { Server as SocketIOServer } from 'socket.io';

declare module 'fastify' {
  export interface FastifyInstance {
    io: SocketIOServer;
  }
  interface FastifyRequest {
    app?: FastifyBoot;
  }
}
