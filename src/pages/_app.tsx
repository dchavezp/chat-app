import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import useRouterLoading from "~/hooks/useRouterLoading";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";
import { AnimatePresence } from "framer-motion";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { isLoading } = useRouterLoading();
  return (
    <SessionProvider session={session}>
      <Layout>
        <AnimatePresence>
          {isLoading ? (
            <Loading text="Loading..." />
          ) : (
            <Component {...pageProps} />
          )}
        </AnimatePresence>
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
