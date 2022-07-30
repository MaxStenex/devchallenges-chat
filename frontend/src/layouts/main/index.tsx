import React from "react";
import { SidePannel } from "./SidePannel";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <SidePannel />
      <div className="flex-1 bg-zinc-800">{children}</div>
    </div>
  );
};
