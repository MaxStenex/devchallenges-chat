import { authMe } from "api/auth";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "types/user";
import { prepareUserData } from "utils/prepareUserData";

const userInitialValue: User & { loggedIn: boolean } = {
  id: 0,
  username: "",
  email: "",
  loggedIn: false,
};

const defaultValue = {
  user: userInitialValue,

  isLoading: true,
  setIsLoading: (val: boolean) => {},

  loginUser: (data: User) => {},
  logoutUser: () => {},
};

const UserContext = createContext(defaultValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(defaultValue.user);
  const [isLoading, setIsLoading] = useState(defaultValue.isLoading);
  const [userIsFetched, setUserIsFetched] = useState(false);

  const router = useRouter();

  const logoutUser = () => {
    setUser(userInitialValue);
  };

  const loginUser = (data: User) => {
    setUser({ ...data, loggedIn: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);

        const { data } = await authMe();
        if (!data) return;
        loginUser(prepareUserData(data));
      } catch (error) {
      } finally {
        setIsLoading(false);
        setUserIsFetched(true);
      }
    };

    if (!userIsFetched) {
      fetchUser();
    }
  }, [isLoading, router, userIsFetched]);

  return (
    <UserContext.Provider
      value={{ user, isLoading, setIsLoading, logoutUser, loginUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
