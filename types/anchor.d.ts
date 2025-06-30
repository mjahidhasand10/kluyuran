import { IChildren } from ".";

export interface IAnchor
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    IChildren {}
