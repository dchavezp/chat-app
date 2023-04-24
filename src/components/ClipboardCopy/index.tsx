import { useCallback, useState } from "react";
import { BiCopy } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
interface ClipboardCopyProps {
  copyText: string;
  pref?: string;
}
function ClipboardCopy({ copyText, pref }: ClipboardCopyProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = useCallback(() => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setMessage("Copied!");
        setTimeout(() => {
          setIsCopied(false);
          setMessage("");
        }, 700);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Something went wrong!");
        setTimeout(() => {
          setMessage("");
        }, 700);
      });
  }, [copyText]);

  return (
    <div className="relative flex w-[12rem] flex-row items-center justify-end gap-2">
      <span className="block gap-1 text-xs">
        {pref}
        {copyText}
      </span>
      <button
        className="btn-ghost btn-square btn-xs btn bg-slate-100 text-gray-400 "
        onClick={handleCopyClick}
      >
        <BiCopy size={12} />
      </button>
      <AnimatePresence>
        {isCopied ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute right-0 top-6 rounded bg-neutral-focus px-2 py-1 text-neutral-content"
          >
            {message}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
export default ClipboardCopy;
