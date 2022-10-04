import { MainLayout } from "layouts";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import "../styles/global.css";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import { UserProvider } from "state/user";
import { ToastProvider } from "state/toasts";
import { RoutsWrapper } from "router";
import Head from "next/head";
import { SocketProvider } from "state/socket";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type ExtendedAppProps = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  return (
    <>
      <Head>
        <title>Devchallenges Chat</title>
      </Head>
      <ToastProvider autoDismiss autoDismissTimeout={3000} placement="bottom-right">
        <SocketProvider>
          <UserProvider>
            <RoutsWrapper>{getLayout(<Component {...pageProps} />)}</RoutsWrapper>
          </UserProvider>
        </SocketProvider>
      </ToastProvider>
    </>
  );
}

export default MyApp;
