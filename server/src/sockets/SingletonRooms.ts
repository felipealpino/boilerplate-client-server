import { AuthTokenRoom } from '@/sockets/common/AuthTokenRoom';
import { AppRoom } from '@/sockets/rooms/AppRoom';
import { Server } from 'socket.io';

type RoomKeys = keyof typeof AVAILABLE_ROOMS;
export const AVAILABLE_ROOMS = {
  APP_ROOM: AppRoom,
  // CHAT_ROOM: AppRoom,
} as const;

type SingletonRoomsArgs = { io: Server };
export class SingletonRooms {
  private rooms: Map<string, AuthTokenRoom<any>> = new Map();

  constructor(args: SingletonRoomsArgs) {
    const { io } = args;
    Object.keys(AVAILABLE_ROOMS).forEach((roomName) => {
      this.rooms.set(roomName, new AVAILABLE_ROOMS[roomName as RoomKeys](io));
    });
  }

  public getRoom(roomName: RoomKeys) {
    const foundRoom = this.rooms.get(roomName);
    if (foundRoom) return foundRoom;

    throw new Error(`Sala ${roomName} não está instanciada.`);
  }
}
