/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { EmojiStyle } from "emoji-picker-react";
interface EmojiPickerProps {
  active?: boolean;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
const Picker = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

function EmojiViewer({ active, setInput }: EmojiPickerProps) {
  const container = {
    hidden: {
      opacity: 0.8,
      transition: {
        ease: "easeInOut",
        duration: 0.2,
      },
    },
    show: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };
  if (active)
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="absolute -top-[29em] z-30"
        layout
      >
        <Picker
          emojiStyle={EmojiStyle.NATIVE}
          emojiVersion={"4.0"}
          searchPlaceHolder="Buscar emoji"
          lazyLoadEmojis
          skinTonesDisabled
          previewConfig={{ showPreview: false }}
          onEmojiClick={(e) => {
            const sym = e.unified.split("-");
            const codesArray: any = [];
            sym.forEach((el: any) => codesArray.push("0x" + el));
            const emoji = String.fromCodePoint(...codesArray);
            setInput((value) => value + emoji);
          }}
        />
      </motion.div>
    );
  return null;
}

export default EmojiViewer;
