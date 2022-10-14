import React, { useEffect, useState } from "react";
import { useSocket } from "state/socket";
import { Message as MessageType } from "types/message";
import { Message } from "./";

type Props = {
  messages: MessageType[];
};

export const MessagesList: React.FC<Props> = ({ messages: initialMessages }) => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    socket.on("new-message", ({ data }) => {
      const message = data;
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.removeAllListeners("new-message");
    };
  }, [socket]);

  return (
    <div className="w-full">
      {messages.map((m) => (
        <Message key={m.id} {...m} />
      ))}
    </div>
  );
};
