import { api } from "~/utils/api";
import Search from "../Search";
import ChatItem from "./ChatItem";
import { useState } from "react";
import { AiOutlineInbox } from "react-icons/ai";

function ChatList() {
  const headerHeight = "180px";
  const [query, setQuery] = useState<string>("");
  const { data: channels } = api.channel.getAllChannelsFromUser.useQuery({
    query,
  });
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full px-4 py-2">
        <h3 className="my-2 text-lg font-bold">My List of Channels</h3>
        <Search
          placeholder="Search a channel"
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div
        className="overflow-y-auto"
        style={{
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        {channels?.map((channel) => {
          return (
            <ChatItem
              key={channel.id}
              id={channel.channelId ?? ""}
              name={channel.Channel?.name ?? ""}
              createdAt={channel.Channel?.createdAt ?? new Date()}
            />
          );
        })}
        {channels?.length === 0 ? (
          <div className="flex h-full flex-col items-center px-4 text-lg">
            <AiOutlineInbox size={40} />
            You haven&apos;t joined into a channel{" "}
            {query !== "" && `with name: ${query}`}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChatList;
