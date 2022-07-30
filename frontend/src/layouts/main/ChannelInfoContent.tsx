import React from "react";
import Image from "next/image";

type Props = {
  onGoHomeClick: () => void;
};

export const ChannelInfoContent: React.FC<Props> = ({ onGoHomeClick }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center py-3 mb-3">
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
    </div>
  );
};
