import { IAnchor } from "@/types";
import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";

export const Anchor: FC<IAnchor> = ({ href, className, children, ...rest }) => {
  return (
    <Link href={href || "#"} className={clsx("anchor", className)} {...rest}>
      {children}
    </Link>
  );
};
