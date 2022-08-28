import React, { useMemo } from "react";
import { Channel, ChannelsContent } from "./ChannelsContent";
import { ChannelInfoContent } from "./ChannelInfoContent";
import { useRouter } from "next/router";
import { UserInfoPanel } from "./UserInfoPanel";

export const SidePanel = () => {
  const router = useRouter();

  const content = useMemo<"channels" | "channel-info">(() => {
    if (router.pathname === "/channel/[id]") return "channel-info";
    return "channels";
  }, [router.pathname]);

  const onChannelClick = (c: Channel) => {
    router.push(`/channel/${c.id}`);
  };

  const onGoHomeClick = () => {
    router.push("/");
  };

  return (
    <div className="w-80 bg-neutral-900 flex flex-col">
      <div className="w-full flex-1 pt-3 pr-5 pl-8 flex flex-col">
        {content === "channels" && <ChannelsContent onChannelClick={onChannelClick} />}
        {content === "channel-info" && (
          <ChannelInfoContent onGoHomeClick={onGoHomeClick} />
        )}
      </div>
      <UserInfoPanel />
    </div>
  );
};
