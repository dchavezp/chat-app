import { BiDotsVerticalRounded, BiArrowFromLeft } from "react-icons/bi";
import DropdownMenu from "~/components/DropdownMenu";
import DropdownMenuItem from "~/components/DropdownMenu/DropdownMenuItem";
import IconButton from "~/components/IconButton";
import useShowHideDivComponent from "~/hooks/useShowHideDivComponent";
import { BsChevronLeft } from "react-icons/bs";
import { useRouter } from "next/router";
import ClipboardCopy from "~/components/ClipboardCopy";
import { type Channel } from "@prisma/client";
import Avatar from "~/components/Avatar";
import { api } from "~/utils/api";
interface ChatUserBarProps {
  channel: Channel;
}
function ChatUserBar({ channel }: ChatUserBarProps) {
  const { active, handleActive, ref } = useShowHideDivComponent();
  const router = useRouter();
  const { data } = api.channel.getUsersFromChannel.useQuery({
    channelId: channel.id,
  });
  const { refetch } = api.channel.getAllChannelsFromUser.useQuery({
    query: "",
  });
  const leaveChannel = api.channel.cancelSuscriptionToChannel.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });
  return (
    <div className="flex h-20 items-center justify-between bg-neutral px-4 py-2">
      <div className="flex flex-row items-center gap-2">
        <IconButton
          action={() => {
            void router.replace("/");
          }}
          variant="ghost"
          size="sm"
        >
          <BsChevronLeft />
        </IconButton>
        <div className="flex flex-col gap-1 text-white">
          <p className="font-bold uppercase">{channel.name}</p>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row items-center gap-1 text-xs text-white">
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
        <div ref={ref}>
          <IconButton action={handleActive} variant="ghost" size="sm">
            <BiDotsVerticalRounded />
          </IconButton>
          <DropdownMenu active={active} className={"right-4"}>
            <DropdownMenuItem>
              <ClipboardCopy copyText={channel.id} pref="Channel ID: " />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                leaveChannel.mutate({ channelId: channel.id });
                void router.replace("/");
              }}
            >
              <BiArrowFromLeft />
              Leave Channel
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default ChatUserBar;
