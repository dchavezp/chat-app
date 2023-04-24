import React from "react";
import { ComponentProps } from "types";

interface TabViewProps extends ComponentProps {
  index: number;
  idView: number;
}

function TabView({
  children,
  index,
  idView,
  ...props
}: TabViewProps & React.ComponentProps<"div">) {
  if (index === idView) return <div {...props}>{children}</div>;
  return null;
}

export default TabView;
