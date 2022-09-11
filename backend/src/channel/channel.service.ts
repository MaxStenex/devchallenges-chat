import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateChannelDto } from "./dto/create-channel.dto";
import { Channel } from "@prisma/client";

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

  async getChannelById(id: number) {
    try {
      if (!id) throw new Error("");

      const channel = await this.prisma.channel.findFirst({
        where: {
          id,
        },
        include: {
          members: {
            select: {
              role: true,
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });

      return channel;
    } catch (error) {
      throw new HttpException("Channel not found", HttpStatus.BAD_REQUEST);
    }
  }

  async getChannelByInvitationHash(hash: string): Promise<Channel> {
    try {
      const channel = await this.prisma.channel.findFirst({
        where: {
          invitationLink: {
            hash,
          },
        },
      });

      if (!channel) throw new Error("");

      return channel;
    } catch (error) {
      throw new HttpException("Channel not found", HttpStatus.BAD_REQUEST);
    }
  }
}
