import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Channel, ChannelInvitationLink, Message } from "@prisma/client";
import { randomBytes } from "crypto";
import { CreateMessageDto } from "src/message/dto/create-message.dto";
import { MessageGateway } from "src/message/message.gateway";
import { MessageService } from "src/message/message.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

// 7 days
const msForExpiration = 1000 * 60 * 60 * 24 * 7;

@Injectable()
export class ChannelInvitationService {
  constructor(
    private prisma: PrismaService,
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway,
    private readonly userService: UserService,
  ) {}

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
      const user = await this.userService.findById(userId);

      if (!user) throw new Error();

      await this.prisma.usersOnChannels.create({
        data: {
          userId,
          channelId,
        },
      });

      const notifyMessage = await this.messageService
        .create({
          text: `Welcome! User ${user.username} joined this channel`,
          channelId,
          senderId: null,
        })
        .catch();

      this.messageGateway.server
        .to(`channel:${channelId}`)
        .emit("new-message", {
          data: notifyMessage,
        });

      return {
        statusCode: 200,
        message: "Successfully",
      };
    } catch (error) {
      let message: string = error.message || "Something went wrong";
      let code = HttpStatus.INTERNAL_SERVER_ERROR;

      if (error.code === "P2002") {
        message = "You are already a member of this channel";
        code = HttpStatus.BAD_REQUEST;
      }

      throw new HttpException(message, code);
    }
  }
}
