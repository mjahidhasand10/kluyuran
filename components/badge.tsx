import { IBadge } from "@/types";
import clsx from "clsx";
import { FC } from "react";

export const Badge: FC<IBadge> = ({
  variant = "primary",
  children,
  ...rest
}) => {
  return (
    <span className={clsx("badge", variant)} {...rest}>
      {children}
    </span>
  );
};
