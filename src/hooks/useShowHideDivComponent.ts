import { useState } from "react";
import useOutsideDivCallback from "./useOutsideCallback";
function useShowHideDivComponent() {
  const [active, setActive] = useState<boolean>(false);
  const handleActive = () => {
    setActive((prev) => !prev);
  };
  const ref = useOutsideDivCallback(() => {
    setActive(false);
  });
  return { active, ref, handleActive };
}
export default useShowHideDivComponent;
