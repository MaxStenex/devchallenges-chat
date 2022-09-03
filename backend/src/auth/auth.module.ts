import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { envNames } from "src/constants";

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env[envNames.jwt_secret],
      signOptions: { expiresIn: "10h" },
    }),
  ],
})
export class AuthModule {}
