import { getChannelMessages } from "api/messages";
import { MessagesList, SendMessageForm } from "components/channel";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSocket } from "state/socket";
import { Message } from "types/message";

type Props = {
  messages: Message[];
};

const ChannelPage: React.FC<Props> = ({ messages }) => {
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
        <MessagesList messages={messages} />
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

    return { props: { messages: data } };
  } catch (error) {
    return {
      props: {
        messages: [],
      },
    };
  }
};

export default ChannelPage;
