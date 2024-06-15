import { socketStore } from '@/stores/socket';
import { Fragment, useEffect } from 'react';
import { io } from 'socket.io-client';

export const LoadSocket: React.FC = () => {
  const { setSocket, socket } = socketStore();

  useEffect(() => {
    const connection = io(import.meta.env.VITE_WEBSOCKET_URL || '', {
      auth: { authUser: { id: Date.now() } },
      reconnection: true, // Habilita a reconexão automática
      reconnectionAttempts: Infinity, // Número máximo de tentativas de reconexão
      reconnectionDelay: 3000, // Intervalo inicial de reconexão (ms)
      reconnectionDelayMax: 5000, // Tempo máximo de espera entre reconexões (ms)
      randomizationFactor: 0.5, // Fator de randomização para tempo de reconexão
    });

    connection?.on('connect', () => {
      setSocket(connection);
      // connection?.emit('SOCKET:CONNECT_USER', { clientId: connection.id });
      console.log('Conectado ao servidor WebSocket.');
    });

    window.addEventListener('beforeunload', () => {
      connection?.emit('DISCONNECT_USER', { clientId: connection.id });
    });
  }, [setSocket]);

  useEffect(() => {
    return () => {
      // Remover ouvinte e desconectar de forma limpa quando o componente for desmontado
      window.removeEventListener('beforeunload', () => {
        socket?.emit('DISCONNECT_USER', { clientId: socket.id });
      });
      socket?.disconnect();
    };
  }, [socket]);

  return <Fragment />;
};
