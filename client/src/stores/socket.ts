import { Socket } from 'socket.io-client'
import { create } from 'zustand'

interface SocketState {
  socket?: Socket
  setSocket: (socket: Socket) => void
}

export const socketStore = create<SocketState>((set) => ({
  socket: undefined,
  setSocket: (value: Socket) =>
    set(() => {
      return { socket: value }
    }),
}))
