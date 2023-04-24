import { motion } from "framer-motion";
import Avatar from "~/components/Avatar";
import { hourFormat } from "~/utils/formatDate";

interface MessageProps {
  senderImage: string;
  senderUsername: string;
  senderDate: Date;
  messageText: string;
  userLogged: string;
}
function Message({
  senderImage,
  senderDate,
  senderUsername,
  messageText,
  userLogged,
}: MessageProps) {
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.6,
      },
    },
  };

  if (senderUsername === userLogged)
    return (
      <motion.div
        className="chat chat-end"
        variants={item}
        initial={"hidden"}
        animate={"show"}
      >
        <div className="chat-bubble max-w-xs">
          <div>
            <span className="text-xs">You:</span>
            <p>{messageText}</p>
            <span className="text-xs">{hourFormat(senderDate)}</span>
          </div>
        </div>
      </motion.div>
    );
  return (
    <motion.div
      className="flex flex-row items-end gap-2"
      variants={item}
      initial={"hidden"}
      animate={"show"}
    >
      <Avatar srcImg={senderImage} className="h-10 w-10" />
      <div className="chat chat-start">
        <div className="chat-bubble max-w-xs">
          <div className="flex flex-col">
            <strong className="text-xs text-accent xl:text-base">
              {senderUsername}
            </strong>
            <p>{messageText}</p>
            <span className="text-xs">{hourFormat(senderDate)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Message;
