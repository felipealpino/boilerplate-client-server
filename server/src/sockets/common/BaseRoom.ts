import { Server, Socket } from 'socket.io';

export type CommonArgs = {
  socket: Socket;
};

export type OnJoinArgs = CommonArgs & {
  [key: string]: any;
};
export abstract class BaseRoom<T> {
  protected io: Server;
  protected connectedSockets: Map<string, Socket> = new Map();
  protected state: T;

  constructor(io: Server) {
    this.io = io;
  }

  protected abstract onJoin(args: OnJoinArgs): Promise<void>;
  protected abstract onLeave(args: CommonArgs): void;
}
