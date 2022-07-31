import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  register?: UseFormRegisterReturn<string>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField: React.FC<Props> = ({ label, register, ...props }) => {
  return (
    <label className="flex flex-col">
      <span className="font-medium mb-2 text-sm">{label}</span>
      <input
        type={"text" || props.type}
        className={`input-primary ${props.className || ""}`}
        {...props}
        {...register}
      />
    </label>
  );
};

TextField.displayName = "TextField";
