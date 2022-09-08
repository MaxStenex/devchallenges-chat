import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChannelAdminGuard } from "src/channel/channel-admin.guard";
import { ChannelInvitationService } from "./channel-invitation.service";

@Controller("channel-invitation")
export class ChannelInvitationController {
  constructor(
    private readonly channelInvitationService: ChannelInvitationService,
  ) {}

  @UseGuards(JwtAuthGuard, ChannelAdminGuard)
  @Get("/:channelId")
  async getChannelId(@Param() params): Promise<string> {
    return this.channelInvitationService.getLink(parseInt(params.channelId));
  }
}
