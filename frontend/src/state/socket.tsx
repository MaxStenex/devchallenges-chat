import { API_URL } from "api";
import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const socket = io(API_URL);

const SocketContext = createContext({ socket });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
