import { BiPlus } from "react-icons/bi";
import { RiWechatLine } from "react-icons/ri";
import UserActions from "../UserActions";
import IconButton from "../IconButton";
import useModal from "~/hooks/useModal";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal";
import { useState } from "react";
import CreateChannel from "~/features/create-channel";
import JoinChannel from "~/features/join-channel";
function Header() {
  const { activeModal } = useModal();
  const [typeForm, setTypeForm] = useState<"create" | "join">("create");
  const getform = (type: "create" | "join") => {
    if (type === "create") return <CreateChannel />;
    return <JoinChannel />;
  };
  return (
    <>
      <AnimatePresence>
        <Modal>
          <div className="rounded-lg bg-white p-6">{getform(typeForm)}</div>
        </Modal>
      </AnimatePresence>
      <div className="flex h-20 w-full flex-row items-center justify-between bg-neutral px-4 py-2">
        <UserActions />
        <div className="flex flex-row items-center gap-2">
          <IconButton
            variant="ghost"
            action={() => {
              setTypeForm("join");
              activeModal(true);
            }}
          >
            <RiWechatLine size={20} />
          </IconButton>
          <IconButton
            action={() => {
              setTypeForm("create");
              activeModal(true);
            }}
            variant="secondary"
          >
            <BiPlus size={24} />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Header;
