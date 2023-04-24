import Image from "next/image";
import loginImage from "~/images/login-img.webp";
import Button from "~/components/Button";
import { RiGoogleLine } from "react-icons/ri";
import { getServerAuthSession } from "~/server/auth";
import { type GetServerSideProps } from "next";
import useAuth from "~/hooks/useAuth";
import FadeInComponent from "~/components/FadeInComponent";

export default function LoginPage() {
  const { signIn } = useAuth();
  return (
    <FadeInComponent>
      <div className="flex h-screen w-screen flex-col lg:flex-row">
        <div className="relative overflow-hidden">
          <Image
            src={loginImage}
            alt="signhero"
            priority
            className="h-screen w-screen object-cover"
          />
          <div className="absolute top-0 flex h-full w-full flex-1 flex-col items-center justify-center gap-6 bg-black bg-opacity-70 ">
            <h1 className="text-5xl font-bold text-primary">My Chat App</h1>
            <div className="flex h-fit flex-col items-center justify-center rounded-2xl bg-white bg-opacity-30 p-6 backdrop-blur-sm">
              <div className="h-2 w-10 bg-green-300" />
              <p className="mb-4 text-center leading-tight tracking-wide text-white">
                Create your channels and <br />
                chat with your friends
              </p>
              <div className="flex w-[300px] flex-col ">
                <Button action={() => void signIn("google")}>
                  Sign in with Google
                  <RiGoogleLine />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col justify-center gap-2 bg-slate-100 p-10"></div>
        </div>
      </div>
    </FadeInComponent>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
