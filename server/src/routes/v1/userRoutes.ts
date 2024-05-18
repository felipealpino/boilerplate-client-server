import { CONNECTED_USERS } from "@/index";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

export const userRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(
    async function (fastify) {
      fastify.get("/", async (_request, reply) => {
        try {
          const users = Array.from(CONNECTED_USERS.keys());
          reply.status(200).send({ version: "v1", data: users });
        } catch {
          reply.status(500).send({ error: "Internal Server Error" });
        }
      });
    },
    { prefix: "/users" }
  );
};
