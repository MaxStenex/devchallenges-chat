import React, { useEffect } from "react";
import { useSocket } from "state/socket";
import { Message as MessageType } from "types/message";
import { Message } from "./";

const dummyMessages: MessageType[] = [
  {
    id: 1,
    sendDate: new Date(),
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, error.",
    sender: {
      id: 1,
      username: "maxStenex",
    },
  },
  {
    id: 2,
    sendDate: new Date(),
    text: "It is an system message",
  },
  {
    id: 3,
    sendDate: new Date(),
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, error.",
    sender: {
      id: 1,
      username: "maxStenex",
    },
  },
];

export const MessagesList = () => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.on("new-message", ({ data }) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="w-full">
      {dummyMessages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </div>
  );
};
