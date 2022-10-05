import { MessagesList, SendMessageForm } from "components/channel";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSocket } from "state/socket";

const ChannelPage = () => {
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
    <div className="px-11 py-9 pb-7 h-full">
      <div className="h-full flex flex-col justify-between">
        <MessagesList />
        <SendMessageForm />
      </div>
    </div>
  );
};

export default ChannelPage;
