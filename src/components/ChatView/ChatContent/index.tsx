import React, { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import Message from "../Message";
import useAuth from "~/hooks/useAuth";
import Pusher from "pusher-js";
interface ChatContentProps {
  channelId: string;
}
const pusher = new Pusher("5d2f917fab53dcb45cc6", {
  cluster: "us2",
});
import { motion } from "framer-motion";
function ChatContent({ channelId }: ChatContentProps) {
  const { sessionData } = useAuth();
  const { data, status, refetch } = api.message.getAllFromChannel.useQuery(
    {
      idChannel: channelId,
    },
    { enabled: sessionData !== undefined }
  );
  const [listOfMessages, setMessages] = useState<typeof data>(data ?? []);
  const bottomDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    const channel = pusher.subscribe(channelId);
    channel.bind("e_message", async ({}) => {
      await refetch();
      setMessages(data);
    });
    return () => {
      pusher.unsubscribe(channelId);
    };
  }, [channelId, data, refetch]);

  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  });
  if (listOfMessages && listOfMessages.length !== 0)
    return (
      <motion.div
        className="flex flex-col-reverse overflow-y-scroll bg-neutral-content px-4 py-4"
        style={{
          height: `calc(100vh - 144px)`,
        }}
      >
        <div ref={bottomDiv} />
        {listOfMessages.map((message, index) => {
          return (
            <Message
              key={message.id}
              id={message.id}
              index={index}
              messageText={message.content}
              senderDate={message.createdAt}
              senderUsername={message.User?.name ?? ""}
              senderImage={message.User?.image ?? ""}
              userLogged={sessionData?.user.name ?? ""}
            />
          );
        })}
      </motion.div>
    );
  return (
    <p
      className="flex items-center justify-center bg-neutral-content px-4 py-4"
      style={{
        height: `calc(100vh - 144px)`,
      }}
    >
      {status === "loading"
        ? "Loading messages"
        : "No messages on this channel"}
    </p>
  );
}

export default ChatContent;
