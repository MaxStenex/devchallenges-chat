-- CreateTable
CREATE TABLE "ChannelInvitationLink" (
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ChannelInvitationLink_channelId_key" ON "ChannelInvitationLink"("channelId");

-- AddForeignKey
ALTER TABLE "ChannelInvitationLink" ADD CONSTRAINT "ChannelInvitationLink_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
