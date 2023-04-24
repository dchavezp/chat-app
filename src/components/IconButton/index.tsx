import { type ComponentWithChildren } from "~/types/types";

interface IconButtonProps extends ComponentWithChildren {
  variant?: "primary" | "secondary" | "ghost";
  type?: "submit" | "reset" | "button";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  action?: () => void;
}
const variantButton = Object.freeze({
  primary: "btn-primary",
  secondary: "btn-outline btn-primary",
  ghost: "btn-ghost text-white hover:bg-white hover:bg-opacity-20",
});
const sizeButton = Object.freeze({
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
});

function IconButton({
  children,
  className = "",
  action,
  size = "md",
  type = "button",
  variant = "primary",
  loading = false,
  ...props
}: IconButtonProps & React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={`btn-square btn text-2xl ${variantButton[variant]} ${
        sizeButton[size]
      } ${loading ? "loading" : ""} ${className}`}
      {...props}
      onClick={action}
    >
      {children}
    </button>
  );
}

export default IconButton;
