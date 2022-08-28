import { api } from "api";
import { CreateChannelInputs } from "components/shared/popups/CreateChannelPopup";

export const getUserChannels = () => {
  return api.get("channels/all");
};

export const createChannel = (formData: CreateChannelInputs) => {
  return api.post("channels/create", formData);
};
