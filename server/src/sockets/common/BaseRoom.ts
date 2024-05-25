import { Server, Socket } from 'socket.io';

export abstract class Room<T> {
  protected io: Server;
  protected socket: Socket;
  protected state: T;

  constructor(io: Server, socket: Socket) {
    this.io = io;
    this.socket = socket;

    // this.socket.on('JOIN_ROOM', this.onJoin.bind(this));
    this.onJoin.bind(this);
    this.socket.on('disconnect', this.onDisconnect.bind(this));
  }

  protected abstract onJoin(options: Record<string, any>): Promise<void>;

  private onDisconnect() {
    console.log(`${this.socket.id} disconnected`);
    this.onLeave();
  }

  protected abstract onLeave(): void;
}
