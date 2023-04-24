import { type ComponentWithChildren } from "~/types/types";

interface ButtonProps extends ComponentWithChildren {
  variant?: "primary" | "secondary" | "ghost";
  type?: "submit" | "reset" | "button";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  action?: () => void;
}
const variantButton = Object.freeze({
  primary: "btn-primary",
  secondary: "btn-outline btn-primary",
  ghost: "btn-ghost",
});
const sizeButton = Object.freeze({
  xs: "btn-xs",
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
});
function Button({
  children,
  action,
  size = "md",
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
}: ButtonProps & React.ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={`btn ${variantButton[variant]} ${sizeButton[size]} gap-1 ${
        loading ? "loading" : ""
      } ${className}`}
      onClick={action}
    >
      {children}
    </button>
  );
}

export default Button;
