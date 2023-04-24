import { type ComponentWithChildren } from "~/types/types";

function DropdownMenuItem({
  children,
  ...props
}: ComponentWithChildren & React.ComponentProps<"li">) {
  return (
    <li {...props}>
      <a>{children}</a>
    </li>
  );
}

export default DropdownMenuItem;
