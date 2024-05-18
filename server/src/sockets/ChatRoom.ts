// // Arquivo: /src/sockets/index.ts
// Exemplo de uso para uma sala de chat em tempo real

import { Socket, Server as SocketIOServer } from "socket.io";
// import { pool } from "../services/db";

export function joinRoomSocket({ socket, io }: { io: SocketIOServer; socket: Socket }) {
  console.log({ socket, io });
  //   socket.on("JOIN_ROOM", async ({ room_id }) => {
  //     console.log(`Cliente ${socket.id} conectado na sala: ${room_id}`);
  //     socket.join(`room-${room_id}`); // Entrar na sala específica
  //     // Buscar mensagens anteriores da sala específica
  //     try {
  //       const query = `
  //           SELECT stcm.*, u.id as user_id, u.name as user_name, u.email as user_email
  //           FROM gif.suport_room_chat_messages stcm
  //           INNER JOIN public.users u ON stcm.auth_user_id = u.id
  //           WHERE stcm.room_id = $1
  //           ORDER BY stcm.created_at ASC;
  //         `;
  //       const { rows } = await pool.query(query, [room_id]);
  //       const messages = rows.map((row) => {
  //         const { user_id, user_name, user_email, ...messageDetails } = row;
  //         return {
  //           ...messageDetails,
  //           auth_user: { id: Number(user_id), name: user_name, email: user_email },
  //         };
  //       });
  //       socket.emit("JOIN_ROOM_MESSAGES", messages); // Emitir todas as mensagens para o socket que entrou na sala
  //     } catch (err) {
  //       console.error("Erro ao buscar mensagens da sala:", err);
  //       socket.emit("JOIN_ROOM_MESSAGES_ERROR", { error: "Erro ao buscar mensagens da sala" });
  //     }
  //   });
  //   socket.on("LEAVE_ROOM", async ({ room_id }) => {
  //     console.log(`Cliente ${socket.id} desconectado da sala: ${room_id}`);
  //     socket.leave(`room-${room_id}`); // Sair da sala específica
  //   });
  //   socket.on("SEND_MESSAGE", async (data: Record<string, any>) => {
  //     console.log("Mensagem recebida:", data.message);
  //     const { room_id, auth_user, message } = data;
  //     try {
  //       const query = `
  //           INSERT INTO gif.suport_room_chat_messages(room_id, auth_user_id, message)
  //           VALUES($1, $2, $3)
  //           RETURNING *, CURRENT_TIMESTAMP as created_at;
  //         `;
  //       const { rows } = await pool.query(query, [room_id, auth_user.id, message]);
  //       const newMessage = { ...rows[0], auth_user };
  //       io.to(`room-${room_id}`).emit("NEW_ROOM_MESSAGE", newMessage); // Emitir nova mensagem para todos na sala
  //     } catch (err) {
  //       console.error("Erro ao inserir mensagem:", err);
  //       socket.to(room_id.toString()).emit("error", { error: "Erro ao inserir mensagem" });
  //     }
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("Cliente desconectado:", socket.id);
  //   });
}
