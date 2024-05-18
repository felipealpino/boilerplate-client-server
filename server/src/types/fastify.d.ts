import "fastify";
import { Server as SocketIOServer } from "socket.io";

declare module "fastify" {
  export interface FastifyInstance {
    io: SocketIOServer;
  }
}
