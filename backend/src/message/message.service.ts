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
        include: {
          sender: true,
        },
      });

      return message;
    } catch (error) {
      throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async getByChannelId(channelId: number) {
    try {
      const messages = await this.prismaService.message.findMany({
        where: {
          channelId,
        },
        include: {
          sender: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      return messages;
    } catch (error) {
      throw new HttpException("Messages not found", HttpStatus.BAD_REQUEST);
    }
  }
}
