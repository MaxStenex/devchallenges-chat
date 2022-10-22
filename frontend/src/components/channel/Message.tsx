import React from "react";
import Image from "next/image";
import type { Message as MessageType } from "types/message";
import dayjs from "dayjs";

type Props = MessageType;

const textClassName = "text-gray-100 font-medium text-lg";

export const Message: React.FC<Props> = ({ text, sender, createdAt }) => {
  if (!sender) {
    return (
      <div className="w-full mb-4">
        <div className={textClassName + " text-green-300"}>
          <span>---</span>
          <span className="mx-2">{text}</span>
          <span>---</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-start">
      <div className="mr-6 mt-2">
        <Image
          width={42}
          height={42}
          src="/images/avatar-placeholder.png"
          alt=""
          className="rounded"
          objectFit="cover"
        />
      </div>
      <div className="">
        <div className="text-gray-500 flex mb-1 items-center">
          <span className="font-bold mr-4 text-lg">{sender.username}</span>
          <span className="text-sm">{dayjs(createdAt).format("LT")}</span>
        </div>
        <div className={textClassName}>{text}</div>
      </div>
    </div>
  );
};
