import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { IChildren } from "./children";

export interface IText extends HTMLAttributes<HTMLSpanElement>, IChildren {
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}
