-- CreateEnum
CREATE TYPE "ChannelRoles" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "UsersOnChannels" ADD COLUMN     "role" "ChannelRoles" NOT NULL DEFAULT 'USER';
