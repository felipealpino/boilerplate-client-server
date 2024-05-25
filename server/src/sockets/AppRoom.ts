import { AuthTokenRoom } from '@/sockets/common/AuthTokenRoom';
import { Server, Socket } from 'socket.io';

export interface AppRoomState {
  authUser: Map<string, string>;
}

const ROOM_NAME = 'APP_ROOM';

export class AppRoom extends AuthTokenRoom<AppRoomState> {
  constructor(io: Server, socket: Socket) {
    super(io, socket);
    this.state = { authUser: new Map() };
  }

  protected async onJoinAuthenticated(options: Record<string, any>): Promise<void> {
    console.log('AppRoom onJoinAuthenticated options:', options);
    const authUser = this.socket.handshake.auth;
    this.state.authUser.set(this.socket.id, JSON.stringify(authUser));

    this.socket.join(ROOM_NAME);

    this.socket.on('CHANGE_COUNT', (data: any) => {
      console.log('CHANGE_COUNT received:', data);
      this.io.to(ROOM_NAME).emit('CHANGE_COUNT', data);
    });

    this.io.to(ROOM_NAME).emit('CONNECTED', { roomName: ROOM_NAME });
  }

  protected onLeave() {
    // const authUser = this.socket.handshake.auth;
    this.state.authUser.delete(this.socket.id);
    console.log(`${this.socket.id} left the AppRoom!`);
    console.log(`There are ${this.state.authUser.size} users remaining in the AppRoom`);
  }
}
