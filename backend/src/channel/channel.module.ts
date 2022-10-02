import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { ChannelController } from "./channel.controller";
import { ChannelGateway } from "./channel.gateway";
import { ChannelService } from "./channel.service";

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [ChannelController],
  providers: [ChannelService, ChannelGateway],
})
export class ChannelModule {}
