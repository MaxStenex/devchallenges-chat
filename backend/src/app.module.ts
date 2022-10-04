import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ChannelModule } from "./channel/channel.module";
import { ConfigModule } from "@nestjs/config";
import { ChannelInvitationModule } from "./channel-invitation/channel-invitation.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    ChannelModule,
    ChannelInvitationModule,
    UserModule,
    MessageModule,
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
