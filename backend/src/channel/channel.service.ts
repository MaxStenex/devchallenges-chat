import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { Channel, User } from "@prisma/client";

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async createChannel({
    description,
    name,
    userId,
  }: CreateChannelDto & { userId: number }): Promise<Channel> {
    try {
      const channel = await this.prisma.channel.create({
        data: {
          description,
          name,
          members: {
            create: [
              {
                userId,
                role: "ADMIN",
              },
            ],
          },
        },
      });

      return channel;
    } catch (error) {
      throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST);
    }
  }

  async getUserChannels(userId: number): Promise<Channel[]> {
    try {
      const userOnChannelsInfo = await this.prisma.usersOnChannels.findMany({
        where: {
          userId,
        },
        include: {
          channel: true,
        },
      });

      return userOnChannelsInfo.map((inf) => inf.channel);
    } catch (error) {
      throw new HttpException("Channels not found", HttpStatus.BAD_REQUEST);
    }
  }

  async getChannelById(
    id: number,
  ): Promise<Channel & { users: Pick<User, "id" | "username">[] }> {
    try {
      if (!id) throw new Error("");

      const channel = await this.prisma.channel.findFirst({
        where: {
          id,
        },
      });

      const channelUsers = await this.prisma.user.findMany({
        where: {
          channels: {
            some: {
              channelId: id,
            },
          },
        },
        select: {
          id: true,
          username: true,
        },
      });

      return { ...channel, users: channelUsers };
    } catch (error) {
      throw new HttpException("Channel not found", HttpStatus.BAD_REQUEST);
    }
  }
}
