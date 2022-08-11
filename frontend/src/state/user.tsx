import React, { createContext, useContext, useState } from "react";

const userInitialValue = {
  id: 0,
  username: "",
  email: "",
};

const defaultValue = {
  user: userInitialValue,
  setUser: (val: typeof userInitialValue) => {},

  isLoading: false,
  setIsLoading: (val: boolean) => {},
};

const UserContext = createContext(defaultValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(defaultValue.user);
  const [isLoading, setIsLoading] = useState(defaultValue.isLoading);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
