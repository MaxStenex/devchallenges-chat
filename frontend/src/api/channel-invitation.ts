import { api } from "./";

export const getChannelInvitation = (channelId: number) => {
  return api.get(`channel-invitation/${channelId}`);
};
