import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ChannelService } from "./channel.service";
import { CreateChannelDto } from "./dto/create-channel.dto";

@Controller("channels")
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  async getUserChannels(@Request() req) {
    return this.channelService.getUserChannels(req.user.id);
  }
}
