import type { User } from "types/user";

export const prepareUserData = (data: any): User => {
  return {
    id: data.id,
    email: data.email,
    username: data.username,
  };
};
