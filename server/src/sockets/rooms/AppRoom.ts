import { AuthTokenRoom } from '@/sockets/common/AuthTokenRoom';
import { CommonArgs, OnJoinArgs } from '@/sockets/common/BaseRoom';
import { Server } from 'socket.io';

export interface AppRoomState {
  authUser: Map<string, string>;
}

export class AppRoom extends AuthTokenRoom<AppRoomState> {
  constructor(io: Server) {
    super(io);
    this.state = { authUser: new Map() };
  }

  protected async onJoinAuthenticated(args: OnJoinArgs): Promise<void> {
    args.socket.join('APP_ROOM');

    const authUser = args.socket.handshake.auth;
    this.state.authUser.set(args.socket.id, JSON.stringify(authUser));

    console.log(`${args.socket.id} entrou na AppRoom!`);
    console.log(`Existem ${Array.from(this.state.authUser.keys()).length} usuários na AppRoom.`);
    console.log('------------');

    args.socket.on('APP_ROOM:DISCONNECT', this.onLeave.bind(this, args));
    args.socket.on('APP_ROOM:CHANGE_COUNT', (data: Record<string, any>) => {
      this.io.to('APP_ROOM').emit('APP_ROOM:CHANGE_COUNT', data);
    });

    this.io.to('APP_ROOM').emit('APP_ROOM:CONNECTED', { roomName: 'APP_ROOM' });
  }

  protected async onLeave(args: CommonArgs) {
    this.state.authUser.delete(args.socket.id);
    args.socket.removeAllListeners('APP_ROOM:DISCONNECT');
    args.socket.removeAllListeners('APP_ROOM:CHANGE_COUNT');
    args.socket.leave('APP_ROOM');
    console.log(`${args.socket.id} saiu da AppRoom!`);
    console.log('------------');
  }
}
