import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "state/socket";
import { Message as MessageType, MessagesDates } from "types/message";
import { getMessageDate } from "utils/messageDate";
import { Message } from "./";

type Props = {
  messages: MessageType[];
  messagesDates: MessagesDates;
};

const elementIsVisible = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight + 200 || document.documentElement.clientHeight)
  );
};

export const MessagesList: React.FC<Props> = ({
  messages: initialMessages,
  messagesDates: initialMessagesDates,
}) => {
  const { socket } = useSocket();

  const [messages, setMessages] = useState(initialMessages);
  const [messagesDates, setMessagesDates] = useState(initialMessagesDates);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesWrapperRef = useRef<HTMLDivElement>(null);
  const [scrollBtnIsVisible, setScrollBtnIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const messagesEnd = messagesEndRef.current;
      if (!messagesEnd) return;

      const messagesEndIsVisible = elementIsVisible(messagesEnd);

      if (messagesEndIsVisible) {
        setScrollBtnIsVisible(false);
      } else {
        setScrollBtnIsVisible(true);
      }
    };

    const messagesWrapper = messagesWrapperRef.current;
    messagesWrapper?.addEventListener("scroll", onScroll);

    return () => {
      messagesWrapper?.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  const scrollMessagesToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
    setScrollBtnIsVisible(false);
  };

  useEffect(scrollMessagesToBottom, [messages]);

  return (
    <div
      ref={messagesWrapperRef}
      className="w-full overflow-auto scrollbar-thin px-11 py-9 pb-7 relative"
    >
      <div className="relative">
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
        <div className="absolute bottom-0" ref={messagesEndRef} />
        {scrollBtnIsVisible && (
          <div
            className="sticky bottom-0 bg-black inline-flex left-1/2 -translate-x-1/2 rounded
          text-white px-3 py-1 font-bold cursor-pointer text-sm"
            onClick={scrollMessagesToBottom}
          >
            Scroll to bottom
          </div>
        )}
      </div>
    </div>
  );
};
