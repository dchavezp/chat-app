import React from "react";
import { ComponentProps } from "types";
interface TabProps extends ComponentProps {
  active?: boolean;
}
function Tab({
  children,
  active,
  className,
  ...props
}: TabProps & React.ComponentProps<"a">) {
  if (active)
    return (
      <a className={`tab ${active && "tab-active"} ${className}`} {...props}>
        <strong>{children}</strong>
      </a>
    );
  return (
    <a className={`tab ${active && "tab-active"} ${className}`} {...props}>
      {children}
    </a>
  );
}

export default Tab;
