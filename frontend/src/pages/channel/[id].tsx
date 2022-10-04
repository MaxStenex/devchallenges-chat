import { MessagesList, SendMessageForm } from "components/channel";
import React from "react";

const ChannelPage = () => {
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
