import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const hash = await bcrypt.hash(data.password, 5);

      const user = await this.prisma.user.create({
        data: {
          ...data,
          password: hash,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException("Email already taken", HttpStatus.CONFLICT);
    }
  }
}
