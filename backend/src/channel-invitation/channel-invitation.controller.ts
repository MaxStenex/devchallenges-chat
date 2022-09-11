import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ChannelAdminGuard } from "src/channel/channel-admin.guard";
import { ChannelInvitationService } from "./channel-invitation.service";

@Controller("channel-invitation")
export class ChannelInvitationController {
  constructor(
    private readonly channelInvitationService: ChannelInvitationService,
  ) {}

  @UseGuards(ChannelAdminGuard)
  @Get("/:channelId")
  async getLinkByChannelId(@Param() params): Promise<string> {
    return this.channelInvitationService.getLink(parseInt(params.channelId));
  }
}
