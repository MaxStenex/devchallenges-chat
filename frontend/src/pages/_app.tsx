import { MainLayout } from "layouts";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import "../styles/global.css";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import { UserProvider } from "state/user";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return <UserProvider>{getLayout(<Component {...pageProps} />)}</UserProvider>;
}

export default MyApp;
