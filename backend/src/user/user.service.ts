import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: User["id"]): Promise<User> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
  }
}
