import React from "react";

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = (props) => {
  return (
    <input
      {...props}
      type={"text" || props.type}
      className={`py-4 px-3 bg-gray-600 text-sm font-medium w-full
      rounded text-white ${props.className || ""}`}
    />
  );
};
