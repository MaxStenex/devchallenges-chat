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

export type UserType = Omit<typeof userInitialValue, "loggedIn">;

const defaultValue = {
  user: userInitialValue,

  isLoading: true,
  setIsLoading: (val: boolean) => {},

  loginUser: (data: UserType) => {},
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

  const loginUser = (data: UserType) => {
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
      <UserPathHandler>{children}</UserPathHandler>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

function UserPathHandler({ children }: any) {
  const router = useRouter();
  const {
    user: { loggedIn },
    isLoading,
  } = useUser();

  const userOnAuthPage = router.pathname === "/login" || router.pathname === "/register";

  useEffect(() => {
    if (!isLoading && !loggedIn && !userOnAuthPage) {
      router.push("/login");
    }

    if (!isLoading && loggedIn && userOnAuthPage) {
      router.push("/");
    }
  }, [isLoading, loggedIn, userOnAuthPage]);

  if ((isLoading || !loggedIn) && !userOnAuthPage) {
    return "Loading...";
  }

  if (loggedIn && userOnAuthPage) {
    return "Loading...";
  }

  return children;
}
