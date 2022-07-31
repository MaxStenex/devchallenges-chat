import React from "react";

type Props = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <label className="flex flex-col">
        <span className="font-medium mb-2 text-sm">{label}</span>
        <input
          type={"text" || props.type}
          className={`input-primary ${props.className || ""}`}
          {...props}
          ref={ref}
        />
        {error && <span className="mt-1 text-sm">{error}</span>}
      </label>
    );
  }
);

TextField.displayName = "TextField";
