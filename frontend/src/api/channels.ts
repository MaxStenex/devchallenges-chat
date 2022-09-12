import { api } from "api";
import { AxiosRequestConfig } from "axios";
import { CreateChannelInputs } from "components/shared/popups/CreateChannelPopup";

export const getUserChannels = () => {
  return api.get("channels/all");
};

export const createChannel = (formData: CreateChannelInputs) => {
  return api.post("channels/create", formData);
};

export const getChannelById = (id: number) => {
  return api.get(`channels/${id}`);
};

export const getChannelByInvitationHash = ({
  hash,
  config,
}: {
  hash: string;
  config?: AxiosRequestConfig;
}) => {
  return api.get(`channels/by-invitation/${hash}`, config);
};
