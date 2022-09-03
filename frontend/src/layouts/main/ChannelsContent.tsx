import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDebounce } from "hooks";
import { CreateChannelPopup } from "components/shared/popups";
import { getUserChannels } from "api/channels";
import { Loader } from "components/shared/loaders";
import { Channel } from "types/channel";

export type ChannePanellItem = Pick<Channel, "id" | "name">;

const getChannelLettersPreview = (name: string): string => {
  return name
    .split(" ")
    .map((s) => s.charAt(0))
    .join("");
};

type Props = {
  onChannelClick: (c: ChannePanellItem) => void;
};

export const ChannelsContent: React.FC<Props> = ({ onChannelClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [openedPopup, setOpenedPopup] = useState<"" | "createChannel">("");
  const closePopup = () => setOpenedPopup("");

  const [channels, setChannels] = useState<ChannePanellItem[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<ChannePanellItem[]>(channels);

  const [searchValue, setSearchValue] = useState("");

  const onChannelsSearch = (val: string) => {
    if (val === "") return setFilteredChannels(channels);

    setFilteredChannels(
      channels.filter((ch) => ch.name.trim().toLocaleLowerCase().includes(val))
    );
  };

  useEffect(() => {
    const loadUserChannel = async () => {
      try {
        setIsLoading(true);

        const { data } = await getUserChannels();

        if (Array.isArray(data)) {
          setChannels(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserChannel();
  }, []);

  useDebounce(() => {
    onChannelsSearch(searchValue.trim().toLowerCase());
  }, 100);

  return (
    <div className="flex-1 flex flex-col">
      {openedPopup === "createChannel" && <CreateChannelPopup onClose={closePopup} />}
      <div className="flex justify-between items-center py-3 mb-3">
        <h3 className="text-gray-100 text-lg">Channels</h3>
        <button
          className="bg-gray-700 rounded w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            setOpenedPopup("createChannel");
          }}
        >
          <Image width={14} height={14} src="/icons/plus.svg" alt="" />
        </button>
      </div>
      <div className="mb-8">
        <input
          placeholder="Search"
          type="text"
          className="input-primary"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <ul className="space-y-5 mb-5 flex-1">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader size={32} />
          </div>
        ) : (
          filteredChannels.map((c) => (
            <li
              key={c.id}
              className="flex items-center cursor-pointer"
              onClick={() => onChannelClick(c)}
            >
              <span
                className="bg-gray-700 rounded w-9 h-9 font-semibold
                text-lg flex items-center justify-center text-white mr-3 uppercase"
              >
                {getChannelLettersPreview(c.name)}
              </span>
              <span className="font-bold text-lg uppercase text-gray-400">{c.name}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
