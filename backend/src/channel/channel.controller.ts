import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";

@Controller("channels")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post("/create")
  async createChannel(
    @Request() req,
    @Body() createChannelDto: CreateChannelDto,
  ) {
    return this.channelService.createChannel({
      ...createChannelDto,
      userId: req.user.id,
    });
  }

  @Get("/all")
  async getUserChannels(@Request() req) {
    return this.channelService.getUserChannels(req.user.id);
  }

  @Get("/:id")
  async getChannelById(@Param() params) {
    return this.channelService.getChannelById(parseInt(params.id));
  }

  @Get("/by-invitation/:hash")
  async getChannelByInvitationHash(@Param() params) {
    return this.channelService.getChannelByInvitationHash(params.hash);
  }
}
