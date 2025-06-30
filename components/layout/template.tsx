import { IChildren } from "@/types";
import { FC } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const Template: FC<IChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
