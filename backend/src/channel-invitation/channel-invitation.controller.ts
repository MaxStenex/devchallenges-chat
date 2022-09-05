import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChannelInvitationService } from "./channel-invitation.service";

@Controller("channel-invitation")
export class ChannelInvitationController {
  constructor(
    private readonly channelInvitationService: ChannelInvitationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get("/:channelId")
  async getChannelId(@Param() params) {
    return this.channelInvitationService.getLink(parseInt(params.channelId));
  }
}
