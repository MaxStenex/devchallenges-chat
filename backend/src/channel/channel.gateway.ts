import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ cors: true })
export class ChannelGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("join-channel")
  clientJoinedChannel(@ConnectedSocket() client: Socket, @MessageBody() data) {
    try {
      const channelId = data.channelId;
      if (channelId) {
        client.join(`channel:${data.channelId}`);
      }
    } catch (error) {}
  }

  @SubscribeMessage("leave-channel")
  clientLeaveChannel(@ConnectedSocket() client: Socket, @MessageBody() data) {
    try {
      const channelId = data.channelId;
      if (channelId) {
        client.leave(`channel:${data.channelId}`);
      }
    } catch (error) {}
  }
}
