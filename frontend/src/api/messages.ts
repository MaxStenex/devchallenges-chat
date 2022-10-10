import { api } from "api";
import { AxiosRequestConfig } from "axios";

export const getChannelMessages = (channelId: number, config?: AxiosRequestConfig) => {
  return api.get(`messages/${channelId}`, config);
};
