import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [PrismaModule, AuthModule, ChannelModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
