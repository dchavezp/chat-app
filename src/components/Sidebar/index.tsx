import { type ComponentWithChildren } from "~/types/types";

function Sidebar({ children }: ComponentWithChildren) {
  return (
    <aside className="h-screen bg-base-100 xl:w-[25vw] xl:border-r-[1px] xl:border-r-base-300">
      {children}
    </aside>
  );
}

export default Sidebar;
