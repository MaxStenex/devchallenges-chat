import { Message } from "@prisma/client";

export type CreateMessageDto = Omit<Message, "id">;
