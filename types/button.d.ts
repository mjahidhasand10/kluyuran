import { ButtonHTMLAttributes } from "react";
import { IChildren } from "./children";

export interface IButton
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    IChildren {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
}
