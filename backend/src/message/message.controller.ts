import { Controller, Get, Param } from "@nestjs/common";
import { MessageService } from "./message.service";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get("/:channelId")
  async getChannelMessages(@Param("channelId") id) {
    return this.messageService.getByChannelId(parseInt(id));
  }
}
