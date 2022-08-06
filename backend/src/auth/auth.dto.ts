import { Prisma } from "@prisma/client";

export type RegisterDto = Prisma.UserCreateInput;

export type LoginDto = {
  email: string;
  password: string;
};
