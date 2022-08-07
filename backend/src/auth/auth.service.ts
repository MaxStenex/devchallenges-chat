import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto, RegisterDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
    email,
    password,
  }: LoginDto): Promise<User & { accessToken: string }> {
    try {
      const [user]: User[] = await this.prisma
        .$queryRaw`SELECT * FROM "public"."User" WHERE email = ${email}`;

      if (!user) throw new Error("Invalid email or password");

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) throw new Error("Invalid email or password");

      delete user.password;

      const tokenPayload = { sub: user.id };

      return { ...user, accessToken: this.jwtService.sign(tokenPayload) };
    } catch (error) {
      throw new HttpException(
        error.message || "Something went wrong",
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
