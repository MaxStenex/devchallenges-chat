import { getChannelMessages } from "api/messages";
import { MessagesList, SendMessageForm } from "components/channel";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSocket } from "state/socket";
import { Message, MessagesDates } from "types/message";
import { getMessageDate } from "utils/messageDate";

type Props = {
  messages: Message[];
  messagesDates: MessagesDates;
};

const ChannelPage: React.FC<Props> = ({ messages, messagesDates }) => {
  const { socket } = useSocket();
  const router = useRouter();

  const channelId = router.query.id;

  useEffect(() => {
    if (channelId) {
      socket.emit("join-channel", { channelId });
    }

    return () => {
      socket.emit("leave-channel", { channelId });
    };
  }, [channelId, socket]);

  return (
    <div className="h-full">
      <div className="h-full flex flex-col justify-between">
        <MessagesList messages={messages} messagesDates={messagesDates} />
        <SendMessageForm />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}): Promise<{ props: Props }> => {
  try {
    const { data }: { data: Message[] } = await getChannelMessages(
      parseInt(params?.id as string),
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    const datesSet = new Set<string>();
    for (let message of data) {
      const messageDate = getMessageDate(message.createdAt);
      datesSet.add(messageDate);
    }

    return { props: { messages: data, messagesDates: Array.from(datesSet) } };
  } catch (error) {
    return {
      props: {
        messages: [],
        messagesDates: [],
      },
    };
  }
};

export default ChannelPage;
