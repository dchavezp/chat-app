import React from "react";
import useModal from "~/hooks/useModal";
import { type ComponentWithChildren } from "~/types/types";
import { motion } from "framer-motion";

function Modal({ children }: ComponentWithChildren) {
  const { showModal } = useModal();
  if (!showModal) {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-slate-900 bg-opacity-40 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

export default Modal;
