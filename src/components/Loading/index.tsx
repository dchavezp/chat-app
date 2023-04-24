import { motion } from "framer-motion";
interface LoadingProps extends React.ComponentProps<"div"> {
  text: string;
}
const Loading: React.FC<LoadingProps> = ({ text, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={
        "flex h-full w-full animate-pulse flex-row items-center justify-center gap-2 text-xl" +
        className
      }
    >
      {text}
    </motion.div>
  );
};

export default Loading;
