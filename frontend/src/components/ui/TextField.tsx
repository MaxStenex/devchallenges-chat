import React from "react";

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<Props> = ({ label, ...props }) => {
  return (
    <label className="flex flex-col">
      <span className="font-medium mb-2 text-sm">{label}</span>
      <input
        type={"text" || props.type}
        className={`input-primary ${props.className || ""}`}
        {...props}
      />
    </label>
  );
};
