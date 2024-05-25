import { Room } from '@/sockets/common/BaseRoom';
import { Server, Socket } from 'socket.io';

export abstract class AuthTokenRoom<T> extends Room<T> {
  constructor(io: Server, socket: Socket) {
    super(io, socket);
    // this.socket.use((packet, next) => this.authenticate(packet, next));
  }

  // private async authenticate(packet: any, next: (err?: any) => void) {
  //   console.log('packet', packet);
  //   const token = packet?.token;
  //   if (!process.env.AUTH_APP_SECRET) return next(new Error('AUTH_APP_SECRET not found'));

  //   try {
  //     const decoded = jwt.verify(token, process.env.AUTH_APP_SECRET) as JwtPayload;
  //     (this.socket as any).authUser = decoded;
  //     next();
  //   } catch (error: any) {
  //     console.error('AuthTokenRoom authenticate error:', error.message);
  //     next(new Error('Authentication error'));
  //   }
  // }

  protected async onJoin(options: Record<string, any>): Promise<void> {
    const authUser = this.socket.handshake.auth;
    console.log('AuthTokenRoom onJoin authUser:', authUser);
    if (!authUser) {
      this.socket.emit('error', 'Unauthorized');
      this.socket.disconnect(true);
      return;
    }
    await this.onJoinAuthenticated(options);
  }

  protected abstract onJoinAuthenticated(options: Record<string, any>): Promise<void>;
}
