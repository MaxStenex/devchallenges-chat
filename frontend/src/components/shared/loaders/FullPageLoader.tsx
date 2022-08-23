import React from "react";
import Image from "next/image";

const imageSize = 128;

export const FullPageLoader = () => {
  return (
    <div className="w-screen h-screen bg-zinc-800">
      <div className="flex items-center justify-center h-full w-full">
        <Image width={imageSize} height={imageSize} src="/images/loading.gif" alt="" />
      </div>
    </div>
  );
};
