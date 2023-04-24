import { type NextPage } from "next";
import { type GetServerSideProps } from "next";
import useAuth from "~/hooks/useAuth";
import { getServerAuthSession } from "~/server/auth";
import { BsChatQuote } from "react-icons/bs";
import Button from "~/components/Button";
import useModal from "~/hooks/useModal";
import ChatList from "~/components/ChatList";

interface UserData {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

const Home: NextPage = () => {
  const { sessionData } = useAuth();
  const { activeModal } = useModal();
  if (sessionData)
    return (
      <>
        <div className="hidden h-full w-full flex-col items-center justify-center xl:flex">
          <BsChatQuote size={80} className="mb-6" />
          <span className="mb-1 block text-2xl font-bold">
            Welcome {sessionData?.user.name}
          </span>
          <p className="text-center text-sm leading-tight tracking-wide">
            Create a new channel and send the <strong>Channel Id</strong> to
            your friend{" "}
            <span className="my-2 block">
              <Button
                action={() => {
                  activeModal(true);
                }}
                variant="secondary"
              >
                Create New Channel
              </Button>{" "}
            </span>
            or <br /> just pick one from the list
          </p>
        </div>
        <div className="block xl:hidden">
          <ChatList />
        </div>
      </>
    );
  return null;
};

export const getServerSideProps: GetServerSideProps<{
  user: UserData;
}> = async (context) => {
  const authSession = await getServerAuthSession(context);
  const user: UserData = {
    ...authSession?.user,
  };
  if (!authSession) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
    },
  };
};

export default Home;
