import { FullPageLoader } from "components/shared/loaders";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "state/user";

export function RoutsWrapper({ children }: any) {
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
  }, [isLoading, loggedIn, router, userOnAuthPage]);

  if ((isLoading || !loggedIn) && !userOnAuthPage) {
    return <FullPageLoader />;
  }

  if (loggedIn && userOnAuthPage) {
    return <FullPageLoader />;
  }

  return children;
}
