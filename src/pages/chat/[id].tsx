import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import ChatView from "~/components/ChatView";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";

function ChatPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: channel } = api.channel.getChannelById.useQuery({
    channelId: id?.toString() ?? "",
  });
  if (channel) {
    return <ChatView channel={channel} />;
  }
  return null;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const authSession = await getServerAuthSession(context);
  if (!authSession) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default ChatPage;
