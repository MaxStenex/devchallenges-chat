import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { User } from "@prisma/client";
import { Socket, Server } from "socket.io";
import { UserService } from "src/user/user.service";

@WebSocketGateway({ cors: true })
export class ChannelGateway {
  constructor(private userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("join-channel")
  async newUserJoinedChannel(
    client: Socket,
    payload: {
      channelId: number;
      userId: User["id"];
    },
  ) {
    const room = "channel:" + payload.channelId;
    client.join(room);

    const user = await this.userService.findById(payload.userId);

    client.broadcast.to(room).emit("new-user-in-channel", {
      user,
    });
  }
}
