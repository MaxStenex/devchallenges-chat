import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { MessageGateway } from "./message.gateway";

@Module({
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  imports: [PrismaModule],
  exports: [MessageService, MessageGateway],
})
export class MessageModule {}
