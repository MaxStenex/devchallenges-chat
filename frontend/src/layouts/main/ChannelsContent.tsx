import React, { useState } from "react";
import Image from "next/image";
import { Input } from "components/ui";

export type Channel = {
  id: number;
  name: string;
};

const dummyChannels: Channel[] = [
  {
    id: 1,
    name: "Frontend Developers",
  },
  {
    id: 2,
    name: "Default",
  },
];

const getChannelLettersPreview = (name: string): string => {
  return name
    .split(" ")
    .map((s) => s.charAt(0))
    .join("");
};

type Props = {
  onChannelClick: (c: Channel) => void;
};

export const ChannelsContent: React.FC<Props> = ({ onChannelClick }) => {
  const [channels] = useState<Channel[]>(dummyChannels);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>(channels);

  const onChannelsSearch = (val: string) => {
    if (val === "") return setFilteredChannels(channels);

    setFilteredChannels(
      dummyChannels.filter((ch) => ch.name.trim().toLocaleLowerCase().includes(val))
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center py-3 mb-3">
        <h3 className="text-gray-100 text-lg">Channels</h3>
        <button className="bg-gray-700 rounded w-8 h-8">
          <Image width={14} height={14} src="/icons/plus.svg" alt="" />
        </button>
      </div>
      <div className="mb-8">
        <Input
          placeholder="Search"
          onChange={(e) => onChannelsSearch(e.target.value.trim().toLowerCase())}
        />
      </div>
      <ul className="space-y-5 mb-5">
        {filteredChannels.map((c) => (
          <li
            key={c.id}
            className="flex items-center cursor-pointer"
            onClick={() => onChannelClick(c)}
          >
            <span
              className="bg-gray-700 rounded w-9 h-9 font-semibold
              text-lg flex items-center justify-center text-white mr-3"
            >
              {getChannelLettersPreview(c.name)}
            </span>
            <span className="font-bold text-lg uppercase text-gray-400">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
