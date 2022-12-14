import { Module } from "@nestjs/common";
import { ChannelModule } from "src/channel/channel.module";
import { MessageModule } from "src/message/message.module";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { ChannelInvitationController } from "./channel-invitation.controller";
import { ChannelInvitationService } from "./channel-invitation.service";

@Module({
  controllers: [ChannelInvitationController],
  providers: [ChannelInvitationService, PrismaService],
  imports: [MessageModule, UserModule, ChannelModule],
})
export class ChannelInvitationModule {}
