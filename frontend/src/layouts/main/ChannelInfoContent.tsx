import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getChannelById } from "api/channels";
import { Channel } from "types/channel";

type Props = {
  onGoHomeClick: () => void;
};

export const ChannelInfoContent: React.FC<Props> = ({ onGoHomeClick }) => {
  const [channelInfo, setChannelInfo] = useState<Channel | null>(null);

  const router = useRouter();
  const channelId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : null;

  useEffect(() => {
    if (channelId) {
      getChannelById(channelId).then(({ data }) =>
        setChannelInfo({
          id: data.id,
          description: data.description,
          name: data.name,
        })
      );
    }
  }, [channelId]);

  return (
    <div className="">
      <div className="flex justify-between items-center py-3 mb-6">
        <button
          onClick={onGoHomeClick}
          className="text-gray-100 text-lg flex items-center"
        >
          <div className="flex mr-5 rotate-90">
            <Image width={15} height={15} src="/icons/dropdown.svg" alt="" />
          </div>
          All channels
        </button>
      </div>
      {channelInfo && (
        <div className="text-gray-100">
          <h3 className="font-bold text-lg mb-4 uppercase">{channelInfo.name}</h3>
          <div className="text-lg leading-4">{channelInfo.description}</div>
        </div>
      )}
    </div>
  );
};
