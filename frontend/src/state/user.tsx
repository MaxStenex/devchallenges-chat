import { authMe } from "api/auth";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { prepareUserData } from "utils/prepareUserData";

const userInitialValue = {
  id: 0,
  username: "",
  email: "",
  loggedIn: false,
};

const defaultValue = {
  user: userInitialValue,
  setUser: (val: typeof userInitialValue) => {},

  isLoading: false,
  setIsLoading: (val: boolean) => {},
};

const unprotectedPages = ["/login", "/register"];

const UserContext = createContext(defaultValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(defaultValue.user);
  const [isLoading, setIsLoading] = useState(defaultValue.isLoading);
  const [userIsFetched, setUserIsFetched] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userOnUnprotectedPage = unprotectedPages.some(
        (path) => path === router.pathname
      );

      try {
        setIsLoading(true);

        const { data } = await authMe();
        if (!data) throw new Error("Unauthenticated");
        setUser(prepareUserData(data));

        if (userOnUnprotectedPage) router.push("/");
      } catch (error) {
        if (!userOnUnprotectedPage) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
        setUserIsFetched(true);
      }
    };

    if (!userIsFetched) {
      fetchUser();
    }
  }, [isLoading, router, userIsFetched]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
