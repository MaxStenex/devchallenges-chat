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
  const onAuthPageFrom = router.query.from && String(router.query.from);

  useEffect(() => {
    if (!isLoading && !loggedIn && !userOnAuthPage) {
      router.push("/login");
    }

    if (!isLoading && loggedIn && userOnAuthPage) {
      if (onAuthPageFrom) {
        router.push(onAuthPageFrom);
      } else {
        router.push("/");
      }
    }
  }, [isLoading, loggedIn, onAuthPageFrom, router, userOnAuthPage]);

  if ((isLoading || !loggedIn) && !userOnAuthPage) {
    return <FullPageLoader />;
  }

  if (loggedIn && userOnAuthPage) {
    return <FullPageLoader />;
  }

  return children;
}
