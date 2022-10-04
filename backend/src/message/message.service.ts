import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessageService {
  constructor(private prismaService: PrismaService) {}

  async create({ channelId, senderId, text }: CreateMessageDto) {
    try {
      const message = await this.prismaService.message.create({
        data: {
          text,
          channelId,
          senderId,
        },
      });

      return message;
    } catch (error) {
      console.log(error);
      throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST);
    }
  }
}
