import { User } from "./user";

export type Message = {
  id: number;
  text: string;
  sendDate: Date;
  sender?: Pick<User, "id" | "username">;
};
