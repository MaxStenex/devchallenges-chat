import React from "react";
import { Message as MessageType } from "types/message";
import { Message } from "./";

const dummyMessages: MessageType[] = [
  {
    id: 1,
    fromSystem: false,
    sendDate: new Date(),
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, error.",
    username: "maxStenex",
  },
  {
    id: 2,
    fromSystem: true,
    sendDate: new Date(),
    text: "It is an system message",
  },
  {
    id: 3,
    fromSystem: false,
    sendDate: new Date(),
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, error.",
    username: "maxStenex",
  },
];

export const MessagesList = () => {
  return (
    <div className="w-full">
      {dummyMessages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </div>
  );
};
