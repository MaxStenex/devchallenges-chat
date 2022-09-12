import { api } from "./";

export const getChannelInvitation = (channelId: number) => {
  return api.get(`channel-invitation/${channelId}`);
};

export const acceptInvitation = (channelId: number) => {
  return api.post(`channel-invitation/accept/${channelId}`);
};
