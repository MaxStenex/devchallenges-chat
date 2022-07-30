import React, { useState } from "react";
import { Channel, ChannelsContent } from "./ChannelsContent";
import { ChannelInfoContent } from "./ChannelInfoContent";
import { useRouter } from "next/router";
import Image from "next/image";

export const SidePannel = () => {
  const router = useRouter();

  const [content, setContent] = useState<"channels" | "channel-info">(() => {
    if (router.pathname === "/channel/[id]") return "channel-info";
    return "channels";
  });

  const onChannelClick = (c: Channel) => {
    router.push(`/channel/${c.id}`);
    setContent("channel-info");
  };

  const onGoHomeClick = () => {
    router.push("/");
    setContent("channels");
  };

  return (
    <div className="w-80 bg-neutral-900 flex flex-col">
      <div className="w-full flex-1 pt-3 pr-5 pl-8">
        {content === "channels" && <ChannelsContent onChannelClick={onChannelClick} />}
        {content === "channel-info" && (
          <ChannelInfoContent onGoHomeClick={onGoHomeClick} />
        )}
      </div>
      <div className="bg-black py-3 pr-5 pl-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded overflow-hidden w-11 h-11 relative mr-7">
              <Image
                src="/images/avatar-placeholder.png"
                layout="fill"
                alt=""
                objectFit="cover"
              />
            </div>
            <span className="font-bold text-lg text-gray-500">Xanthe Neal</span>
          </div>
          <button className="flex">
            <Image width={15} height={15} src="/icons/dropdown.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
