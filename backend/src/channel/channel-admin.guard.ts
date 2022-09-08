import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChannelAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = parseInt(request.user.id);
    const channelId = parseInt(request.params.channelId);

    const channel = await this.prisma.channel.findFirst({
      where: {
        id: channelId,
      },
      include: {
        members: {
          where: {
            role: "ADMIN",
          },
        },
      },
    });

    const userIsChannelAdmin = channel.members.some((m) => m.userId === userId);

    if (!userIsChannelAdmin) {
      return false;
    }

    return true;
  }
}
