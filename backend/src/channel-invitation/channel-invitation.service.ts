import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Channel, ChannelInvitationLink } from "@prisma/client";
import { randomBytes } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";

// 7 days
const msForExpiration = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class ChannelInvitationService {
  constructor(private prisma: PrismaService) {}

  async getLink(channelId: number): Promise<string> {
    try {
      const existingLink = await this.prisma.channelInvitationLink.findFirst({
        where: {
          channelId,
        },
      });

      if (existingLink) {
        const isLinkExpired =
          new Date(existingLink.createdAt).getTime() + msForExpiration <
          new Date().getTime();

        if (!isLinkExpired) {
          return existingLink.hash;
        } else {
          await this.prisma.channelInvitationLink.delete({
            where: {
              channelId,
            },
          });
        }
      }

      const invitationLink = await this.createLink(channelId);

      return invitationLink.hash;
    } catch (error) {
      throw new HttpException(
        error.message || "Link not found",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createLink(channelId: number): Promise<ChannelInvitationLink> {
    try {
      const buffer = randomBytes(24);
      const hash = buffer.toString("hex");

      const invitationLink = await this.prisma.channelInvitationLink.create({
        data: {
          hash,
          channel: {
            connect: { id: channelId },
          },
        },
      });

      return invitationLink;
    } catch (error) {
      throw new Error();
    }
  }

  async findChannelByInvitationHash(hash: string): Promise<Channel | null> {
    try {
      const channel = await this.prisma.channel.findFirst({
        where: {
          invitationLink: {
            hash,
          },
        },
      });

      return channel;
    } catch (error) {
      throw new HttpException("Channel not found", HttpStatus.BAD_REQUEST);
    }
  }

  async acceptInvitation({
    userId,
    channelId,
  }: {
    userId: number;
    channelId: number;
  }) {
    try {
      await this.prisma.usersOnChannels.create({
        data: {
          userId,
          channelId,
        },
      });

      return {
        statusCode: 200,
        message: "Successfully",
      };
    } catch (error) {
      let message: string = error.message || "Something went wrong";

      if (error.code === "P2002") {
        message = "You are already a member of this channel";
      }

      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
