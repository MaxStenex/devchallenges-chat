import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

async function excludePasswordMiddleware(params, next) {
  const result = await next(params);
  if (params?.model === "User" && params?.args?.select?.password !== true) {
    if (Array.isArray(result)) {
      result.map((u) => {
        delete u.password;
        return u;
      });
    } else {
      delete result.password;
    }
  }
  return result;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    this.$use(excludePasswordMiddleware);
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
