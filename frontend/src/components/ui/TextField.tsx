import React from "react";

type Props = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = React.forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    return (
      <label className="flex flex-col">
        {label && <span className="font-medium mb-2 text-sm">{label}</span>}
        <input
          {...props}
          type={props.type || "text"}
          className={`input-primary ${props.className || ""}`.trim()}
          ref={ref}
        />
        {error && (
          <span data-testid="textfield-error" className="mt-1 text-sm">
            {error}
          </span>
        )}
      </label>
    );
  }
);

TextField.displayName = "TextField";
