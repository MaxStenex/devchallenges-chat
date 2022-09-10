import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ChannelModule } from "./channel/channel.module";
import { ConfigModule } from "@nestjs/config";
import { ChannelInvitationModule } from "./channel-invitation/channel-invitation.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { JwtModule } from "@nestjs/jwt";
import { envNames } from "./constants";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env[envNames.jwt_secret],
      signOptions: { expiresIn: "10h" },
    }),
    PrismaModule,
    AuthModule,
    ChannelModule,
    ChannelInvitationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
