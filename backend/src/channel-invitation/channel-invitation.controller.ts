import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
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

  @Post("/accept/:channelId")
  async acceptInvitation(@Param() params, @Request() req) {
    return this.channelInvitationService.acceptInvitation({
      userId: parseInt(req.user.id),
      channelId: parseInt(params.channelId),
    });
  }
}
