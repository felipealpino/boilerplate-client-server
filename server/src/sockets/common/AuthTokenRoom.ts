import { BaseRoom, CommonArgs, OnJoinArgs } from '@/sockets/common/BaseRoom';
import { Server } from 'socket.io';

export abstract class AuthTokenRoom<T> extends BaseRoom<T> {
  constructor(io: Server) {
    super(io);
  }

  private authenticate(args: CommonArgs): void {
    const authUser = args.socket.handshake.auth;
    if (!authUser) throw new Error('Usuário não autenticado!');
    console.log('Usuário autenticado!');
  }

  public async onJoin(args: OnJoinArgs): Promise<void> {
    this.connectedSockets.set(args.socket.id, args.socket);
    this.authenticate(args);
    await this.onJoinAuthenticated(args);
  }

  protected abstract onLeave(options: OnJoinArgs): Promise<void>;
  protected abstract onJoinAuthenticated(options: OnJoinArgs): Promise<void>;
}
