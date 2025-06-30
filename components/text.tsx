import { IText } from "@/types";
import clsx from "clsx";
import { FC } from "react";

export const Text: FC<IText> = ({
  as: Component,
  className,
  children,
  ...rest
}) => {
  return (
    <Component className={clsx("text", className)} {...rest}>
      {children}
    </Component>
  );
};
