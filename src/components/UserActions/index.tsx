import DropdownMenu from "../DropdownMenu";
import DropdownMenuItem from "../DropdownMenu/DropdownMenuItem";
import { BiLogOut } from "react-icons/bi";
import Avatar from "../Avatar";
import useShowHideDivComponent from "~/hooks/useShowHideDivComponent";
import useAuth from "~/hooks/useAuth";

function UserActions() {
  const { active, handleActive, ref } = useShowHideDivComponent();
  const { sessionData, signOut } = useAuth();
  return (
    <div className="flex flex-row gap-2">
      <div className={`relative h-12`} ref={ref}>
        <Avatar
          srcImg={
            sessionData?.user.image ??
            "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          onClick={handleActive}
          className="h-12 w-12"
        />
        <DropdownMenu active={active}>
          <DropdownMenuItem onClick={() => void signOut()}>
            <span className="flex w-[120px] flex-row items-center gap-1">
              <BiLogOut /> Sign Out
            </span>
          </DropdownMenuItem>
        </DropdownMenu>
      </div>
      <div className="flex flex-col justify-center text-white">
        <span className="text-xs font-bold">{sessionData?.user.name}</span>
        <span className="text-xs">{sessionData?.user.email}</span>
      </div>
    </div>
  );
}

export default UserActions;
