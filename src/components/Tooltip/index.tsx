import React from "react";
import { type ComponentWithChildren } from "~/types/types";

enum Align {
  top = "tooltip-top",
  bottom = "tooltip-bottom",
}
interface TooltipProps extends ComponentWithChildren {
  text: string;
  align?: Align;
}
function Tooltip({ children, text, align = Align.bottom }: TooltipProps) {
  return (
    <div className={`tooltip ${align} z-40`} data-tip={text}>
      {children}
    </div>
  );
}

export default Tooltip;
