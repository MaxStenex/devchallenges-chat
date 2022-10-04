import React from "react";
import Image from "next/image";

export const SendMessageForm = () => {
  return (
    <form>
      <div className="input-primary flex justify-between items-center pl-0 py-2">
        <input
          type="text"
          placeholder="Type a message here"
          className="flex-1 mr-3 pl-2 bg-transparent h-9"
        />
        <button className="w-8 h-8 px-2 py-2 rounded bg-blue-600">
          <Image src="/icons/send-message.svg" alt="" width="100%" height="100%" />
        </button>
      </div>
    </form>
  );
};
