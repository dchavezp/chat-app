import React from "react";
import { ComponentProps } from "types";

function TabContainer({ children }: ComponentProps) {
  return <div className="tabs px-4 py-2">{children}</div>;
}

export default TabContainer;
