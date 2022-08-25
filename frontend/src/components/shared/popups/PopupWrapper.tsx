import { useOnOutsideClick } from "hooks";
import React from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const PopupWrapper: React.FC<Props> = ({ children, onClose }) => {
  const wrapperRef = useOnOutsideClick<HTMLDivElement>(onClose);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen">
      <div className="bg-black opacity-50 w-full h-full absolute z-10"></div>
      <div ref={wrapperRef}>{children}</div>
    </div>
  );
};
