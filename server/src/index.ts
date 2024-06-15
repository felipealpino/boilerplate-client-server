import { appConfiguration } from '@/config';
import { FastifyBootMiddleware } from '@/middlewares/FastifyBootMiddleware';
import { userRoutes } from '@/routes/v1/userRoutes';
import { AVAILABLE_ROOMS, SingletonRooms } from '@/sockets/SingletonRooms';
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

type JoinRoomDataArgs = { roomName: keyof typeof AVAILABLE_ROOMS; options: Record<string, unknown> };

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
  const RoomManager = new SingletonRooms({ io });

  io.on('connection', async (socket: Socket) => {
    logSockets();

    socket.on('JOIN_ROOM', async (data: JoinRoomDataArgs) => {
      console.log('data:', data);
      const { roomName, options } = data;

      const FoundRoom = RoomManager.getRoom(roomName);
      await FoundRoom.onJoin({ socket, ...options });
    });

    socket.on('disconnect', () => {
      logSockets();
    });
  });

  const logSockets = () => {
    const allSockets = Array.from(io.sockets.sockets.keys());
    console.log(`Total de conexões ativas: ${allSockets.length}`);
    // allSockets.forEach((socketId) => {
    //   console.log(`Socket ativo: ${socketId}`);
    // });
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
