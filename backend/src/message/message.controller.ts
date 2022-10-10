import { Body, Controller, Get, Param, Post, Request } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post("/create")
  async createMessage(
    @Body() dto: Omit<CreateMessageDto, "senderId">,
    @Request() req,
  ) {
    return this.messageService.create({ ...dto, senderId: req.user.id });
  }

  @Get("/:channelId")
  async getChannelMessages(@Param("channelId") id) {
    return this.messageService.getByChannelId(parseInt(id));
  }
}
