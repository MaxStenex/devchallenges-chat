import { User } from "./user";

export type Message = {
  id: number;
  text: string;
  fromSystem: boolean;
  sendDate: Date;
  sender?: Pick<User, "id" | "username">;
};
