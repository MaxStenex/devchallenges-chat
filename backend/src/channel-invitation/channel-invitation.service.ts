import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ChannelInvitationLink } from "@prisma/client";
import { randomBytes } from "crypto";
import { PrismaService } from "src/prisma/prisma.service";

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
        return existingLink.hash;
      }

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
