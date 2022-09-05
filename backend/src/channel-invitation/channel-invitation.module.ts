import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ChannelInvitationController } from "./channel-invitation.controller";
import { ChannelInvitationService } from "./channel-invitation.service";

@Module({
  controllers: [ChannelInvitationController],
  providers: [ChannelInvitationService, PrismaService],
})
export class ChannelInvitationModule {}
