import { Boot } from '@/bootstrap/Boot';
import { config } from '@/config';
import { userRoutes } from '@/routes/v1/userRoutes';
import cors from '@fastify/cors';
import Fastify from 'fastify';
import fastifyIO from 'fastify-socket.io';
import { Socket } from 'socket.io';

const fastify = Fastify({ logger: false });

fastify.register(cors, {
  origin: config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

fastify.register(fastifyIO, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

fastify.register(userRoutes, { prefix: '/v1' });

fastify.get('/', async (request, reply) => {
  const app = new Boot({ request, reply });
  return app.apiExecute(async () => {
    const queryStrings = app.request.getQueryParams();
    return { result: { health: 'checked', queryStrings } };
  });
});

type IUser = { id: string };
export const CONNECTED_USERS = new Map<string, IUser>();

fastify.ready().then(() => {
  console.log('Socket.io está pronto.');
  const io = fastify.io;

  io.on('connection', async (socket: Socket) => {
    console.log('Cliente conectado:', socket.id);
    // joinRoomSocket({ io, socket });
    logConnectedSockets();

    socket.on('CONNECT_USER', (data) => {
      console.log('CONNECT_USER:', data);
      CONNECTED_USERS.set(data.clientId, { id: socket.id });
    });

    socket.on('DISCONNECT_USER', (data) => {
      console.log('DISCONNECT_USER:', data);
      CONNECTED_USERS.delete(data.clientId);
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
      await fastify.listen({ port: Number(config.port), host: config.host });
      console.log(`Server rodando na porta: ${config.port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };

  startServer();
});
