import { User } from "./user";

export type Message = {
  id: number;
  text: string;
  sender?: Pick<User, "id" | "username">;
  createdAt: string;
};

export type MessagesDates = string[];
