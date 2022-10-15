import React from "react";
import { SidePanel } from "./SidePanel";

type Props = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidePanel />
      <div className="flex-1 bg-zinc-800">{children}</div>
    </div>
  );
};
