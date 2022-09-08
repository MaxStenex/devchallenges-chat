import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChannelInvitationLink } from "@prisma/client";
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

      const isLinkExpired =
        new Date(existingLink.createdAt).getTime() + msForExpiration <
        new Date().getTime();

      if (existingLink && !isLinkExpired) {
        return existingLink.hash;
      }

      await this.prisma.channelInvitationLink.delete({
        where: {
          channelId,
        },
      });

      const invitationLink = await this.createLink(channelId);

      return invitationLink.hash;
    } catch (error) {
      console.log(error);
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
}
