import { socketStore } from '@/stores/socket'
import { Fragment, useEffect } from 'react'
import { io } from 'socket.io-client'

const connection = io(import.meta.env.VITE_WEBSOCKET_URL || '', {
  reconnection: true, // Habilita a reconexão automática
  reconnectionAttempts: Infinity, // Número máximo de tentativas de reconexão
  reconnectionDelay: 3000, // Intervalo inicial de reconexão (ms)
  reconnectionDelayMax: 5000, // Tempo máximo de espera entre reconexões (ms)
  randomizationFactor: 0.5, // Fator de randomização para tempo de reconexão
})

export const LoadSocket: React.FC = () => {
  const { setSocket } = socketStore()

  useEffect(() => {
    connection?.on('connect', () => {
      console.log('Conectado ao servidor WebSocket.')
      connection.emit('CONNECT_USER', { clientId: connection.id })
      setSocket(connection)
    })

    window.addEventListener('beforeunload', () => {
      connection.emit('DISCONNECT_USER', { clientId: connection.id })
    })

    return () => {
      // Remover ouvinte e desconectar de forma limpa quando o componente for desmontado
      window.removeEventListener('beforeunload', () => {
        connection.emit('DISCONNECT_USER', { clientId: connection.id })
      })
      connection?.disconnect()
    }
  }, [setSocket])
  return <Fragment />
}
