import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ChannelController } from "./channel.controller";
import { ChannelService } from "./channel.service";

@Module({
  imports: [PrismaModule],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
