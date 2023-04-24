import ChatList from "../ChatList";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { type ComponentWithChildren } from "~/types/types";
import Head from "next/head";
import useAuth from "~/hooks/useAuth";
import Loading from "../Loading";
import { useRouter } from "next/router";

const Layout = ({ children }: ComponentWithChildren) => {
  const { sessionData, loading } = useAuth();
  const router = useRouter();
  const MobileLayout = () => {
    return (
      <div className="flex w-screen flex-col xl:hidden">
        {router.asPath === "/" ? <Header /> : null}
        {children}
      </div>
    );
  };
  const DesktopLayout = () => {
    return (
      <div className="hidden xl:flex xl:flex-row">
        <Sidebar>
          <Header />
          <ChatList />
        </Sidebar>
        <div className="h-screen w-[75vw] bg-secondary bg-opacity-5">
          {children}
        </div>
      </div>
    );
  };
  if (loading) {
    return (
      <>
        <Head>
          <title>My Chat App</title>
          <meta name="description" content="Chat app" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <main>
          <Loading text="Loading..." />
        </main>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>My Chat App</title>
        <meta name="description" content="Chat app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        {sessionData ? (
          <>
            <DesktopLayout />
            <MobileLayout />
          </>
        ) : (
          <>{children}</>
        )}
      </main>
    </>
  );
};

export default Layout;
