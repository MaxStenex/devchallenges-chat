import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSocket } from "state/socket";
import { Message as MessageType, MessagesDates } from "types/message";
import { getMessageDate } from "utils/messageDate";
import { Message } from "./";

type Props = {
  messages: MessageType[];
  messagesDates: MessagesDates;
};

export const MessagesList: React.FC<Props> = ({
  messages: initialMessages,
  messagesDates: initialMessagesDates,
}) => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState(initialMessages);
  const [messagesDates, setMessagesDates] = useState(initialMessagesDates);

  useEffect(() => {
    socket.on("new-message", ({ data }) => {
      const message: MessageType = data;
      const messageDate = getMessageDate(message.createdAt);
      const messageDateExists = messagesDates.includes(messageDate);

      if (!messageDateExists) {
        setMessagesDates((prev) => [...prev, messageDate]);
      }

      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.removeAllListeners("new-message");
    };
  }, [messagesDates, socket]);

  return (
    <div className="w-full overflow-auto scrollbar-thin px-11 py-9 pb-7">
      {messagesDates.map((d) => (
        <div key={d} className="space-y-4">
          <div className="flex justify-center font-semibold text-base text-gray-500 relative">
            <span className="z-20 px-6 bg-zinc-800">
              {dayjs(d).format("MMMM DD, YYYY")}
            </span>
            <span
              style={{ height: 1 }}
              className="z-10 absolute-centered w-full bg-gray-500"
            ></span>
          </div>
          {messages
            .filter((m) => getMessageDate(m.createdAt) === d)
            .map((m) => (
              <Message key={m.id} {...m} />
            ))}
        </div>
      ))}
    </div>
  );
};
