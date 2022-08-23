import type { UserType } from "state/user";

export const prepareUserData = (data: any): UserType => {
  return {
    id: data.id,
    email: data.email,
    username: data.username,
  };
};
