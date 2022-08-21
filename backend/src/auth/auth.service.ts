import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import type { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "./auth.dto";
import { cookieAuthTokenName } from "./jwt.strategy";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async me(userId: number) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || "User not found",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async register(data: RegisterDto): Promise<User> {
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

  async login({
    loginDto,
    res,
  }: {
    loginDto: LoginDto;
    res: Response;
  }): Promise<User> {
    try {
      const { email, password } = loginDto;

      const [user]: User[] = await this.prisma
        .$queryRaw`SELECT * FROM "public"."User" WHERE email = ${email}`;

      if (!user) throw new Error("Invalid email or password");

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) throw new Error("Invalid email or password");

      delete user.password;

      const tokenPayload = { sub: user.id };
      const token = this.jwtService.sign(tokenPayload);

      res.cookie(cookieAuthTokenName, token, { httpOnly: true });

      return user;
    } catch (error) {
      throw new HttpException(
        error.message || "Something went wrong",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async logout(res: Response) {
    try {
      res.clearCookie(cookieAuthTokenName);

      return {
        status: HttpStatus.OK,
        message: "Logout successfully",
      };
    } catch (error) {
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  }
}
