import React, { useCallback } from "react";
import ClipboardCopy from "~/components/ClipboardCopy";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { api } from "~/utils/api";
import Avatar from "~/components/Avatar";
interface ChatItemProps {
  id?: string;
  name?: string;
  createdAt?: Date;
}
function ChatItem({ id = "nd", name, createdAt = new Date() }: ChatItemProps) {
  const router = useRouter();
  const { id: currentPath } = router.query;
  const { data } = api.channel.getUsersFromChannel.useQuery({
    channelId: id,
  });
  const handleClick = useCallback(() => {
    void router.push(`/chat/${id}`);
  }, [router, id]);
  return (
    <div
      className={`relative flex w-full cursor-pointer flex-row justify-between px-4 py-2 duration-200 hover:bg-base-200 hover:transition-colors ${
        currentPath === id ? "bg-base-200" : ""
      }`}
    >
      <button
        className="absolute left-0 top-0 h-full w-full"
        onClick={handleClick}
      />
      <div className="flex flex-col justify-center gap-1">
        <p className="mb-1 text-lg font-bold uppercase leading-none tracking-tight">
          {name}
        </p>
        <div className="flex w-full flex-row justify-between">
          {data ? (
            <div className="avatar-group -space-x-3">
              {data.map((item) => (
                <Avatar
                  key={item.id}
                  srcImg={item.User?.image ?? ""}
                  className="h-5 w-5 cursor-default"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between text-right ">
        <span className="my-1 block text-xs text-accent-focus">
          Created at: {format(createdAt, "yyyy/MM/dd")}
        </span>
        <div className="">
          <ClipboardCopy copyText={id} pref="Id:" />
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
