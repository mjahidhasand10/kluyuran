import { IButton } from "@/types";
import clsx from "clsx";
import { FC } from "react";

export const Button: FC<IButton> = ({
  variant = "primary",
  children,
  size = "medium",
  className,
  ...rest
}) => {
  return (
    <button className={clsx("button", variant, size, className)} {...rest}>
      {children}
    </button>
  );
};
