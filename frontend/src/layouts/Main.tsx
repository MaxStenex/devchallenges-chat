import React from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-80 bg-neutral-900 flex flex-col">
        <div className="flex justify-between items-center py-3 pr-5 pl-8">
          <h3 className="text-gray-100 text-lg">Channels</h3>
          <button className="bg-gray-700 rounded w-8 h-8">
            <Image width={14} height={14} src="/icons/plus.svg" alt="" />
          </button>
        </div>
        <div className="pt-3 mb-8 pr-5 pl-8 w-full">
          <input
            type="text"
            className="py-4 px-3 bg-gray-600 text-sm font-medium w-full
            rounded text-white"
            placeholder="Search"
          />
        </div>
        <ul className="space-y-5 pr-5 pl-8 mb-5 flex-1">
          <li className="flex items-center cursor-pointer">
            <span
              className="bg-gray-700 rounded w-9 h-9 font-semibold
            text-lg flex items-center justify-center text-white mr-3"
            >
              FD
            </span>
            <span className="font-bold text-lg uppercase text-gray-400">
              Frontend Developers
            </span>
          </li>
          <li className="flex items-center cursor-pointer">
            <span
              className="bg-gray-700 rounded w-9 h-9 font-semibold
            text-lg flex items-center justify-center text-white mr-3"
            >
              FD
            </span>
            <span className="font-bold text-lg uppercase text-gray-400">
              Frontend Developers
            </span>
          </li>
        </ul>
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
      <div className="flex-1 bg-zinc-800">{children}</div>
    </div>
  );
};
