import React from "react";

type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <label className="flex flex-col">
        <span className="font-medium mb-2 text-sm">{label}</span>
        <input
          type={"text" || props.type}
          className={`input-primary ${props.className || ""}`}
          {...props}
          ref={ref}
        />
      </label>
    );
  }
);

TextField.displayName = "TextField";
