import { motion, AnimatePresence } from "framer-motion";
import { type ComponentWithChildren } from "~/types/types";

interface DropMenuProps extends ComponentWithChildren {
  active: boolean;
}
function DropdownMenu({
  children,
  active = false,
  className = "",
}: DropMenuProps & React.ComponentProps<"ul">) {
  const container = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: -10,
      opacity: 0,
    },
  };
  return (
    <AnimatePresence>
      {active ? (
        <motion.ul
          className={`menu rounded-box absolute z-20 mt-2 w-fit bg-base-100 p-2 shadow ${className}`}
          variants={container}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {children}
        </motion.ul>
      ) : null}
    </AnimatePresence>
  );
}

export default DropdownMenu;
