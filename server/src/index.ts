import { appConfiguration } from '@/config';
import { FastifyBootMiddleware } from '@/middlewares/FastifyBootMiddleware';
import { userRoutes } from '@/routes/v1/userRoutes';
import { AppRoom } from '@/sockets/AppRoom';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Socket } from 'socket.io';

const fastify = Fastify({ logger: false });

fastify.register(cors, {
  origin: appConfiguration.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

fastify.register(fastifyIO, {
  cors: {
    origin: appConfiguration.corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const AVAILABLE_ROOMS: { [key: string]: any } = {
  APP_ROOM: AppRoom,
};

// Adiciona antes de todas as rotas o middleware BootMiddleware
fastify.addHook('onRequest', FastifyBootMiddleware);

fastify.register(userRoutes, { prefix: '/v1' });
fastify.get('/', async (request) => {
  request.app?.apiExecute(async () => {
    return { result: { health: 'checked' } };
  });
});

fastify.ready().then(() => {
  console.log('Socket.io está pronto.');
  const io = fastify.io;

  io.on('connection', async (socket: Socket) => {
    socket.on('JOIN_ROOM', (data) => {
      const { roomName, options } = data;
      const FoundRoom = AVAILABLE_ROOMS[roomName];
      if (FoundRoom) {
        new FoundRoom(io, socket, roomName).onJoin(options);
      } else {
        console.error(`Room ${roomName} does not exist`);
        socket.emit('error', `Room ${roomName} does not exist`);
      }
    });

    console.log('Cliente conectado:', socket.id);
    // joinRoomSocket({ io, socket });
    logConnectedSockets();

    socket.on('CONNECT_USER', (data) => {
      console.log('CONNECT_USER:', data);
    });

    socket.on('DISCONNECT_USER', (data) => {
      console.log('DISCONNECT_USER:', data);
    });
  });

  const logConnectedSockets = () => {
    const allSockets = Array.from(io.sockets.sockets.keys());
    console.log(`Total de conexões ativas: ${allSockets.length}`);
    allSockets.forEach((socketId) => {
      console.log(`Socket ativo: ${socketId}`);
    });
  };

  const startServer = async () => {
    try {
      await fastify.listen({ port: Number(appConfiguration.port), host: appConfiguration.host });
      console.log(`Server rodando na porta: ${appConfiguration.port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  startServer();
});
