import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { IChildren } from "./children";

export interface IBadge extends HTMLAttributes<HTMLSpanElement>, IChildren {
  variant?: "primary" | "success" | "danger" | "info" | "warning";
}
