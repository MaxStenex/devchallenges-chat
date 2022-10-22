import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";

@WebSocketGateway({ cors: true })
export class MessageGateway {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("new-user-message")
  newUserMessage(@MessageBody() data) {
    try {
      const createMessageDto: CreateMessageDto = data;

      this.messageService.create({
        ...createMessageDto,
        socketServer: this.server,
      });
    } catch (error) {}
  }
}
