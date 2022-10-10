import React, { useEffect } from "react";
import { useSocket } from "state/socket";
import { Message as MessageType } from "types/message";
import { Message } from "./";

type Props = {
  messages: MessageType[];
};

export const MessagesList: React.FC<Props> = ({ messages }) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.on("new-message", ({ data }) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className="w-full">
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </div>
  );
};
