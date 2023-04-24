import React from "react";
import ChatBar from "../ChatBar";
import ChatContent from "./ChatContent";
import ChatUserBar from "./ChatUserBar";
import { type Channel } from "@prisma/client";
interface ChatViewProps {
  channel: Channel;
}
function ChatView({ channel }: ChatViewProps) {
  return (
    <div className="h-screen w-full">
      <ChatUserBar channel={channel} />
      <ChatContent channelId={channel.id} />
      <ChatBar channelID={channel.id} />
    </div>
  );
}

export default ChatView;
