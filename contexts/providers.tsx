"use client";
import { FC } from "react";
import { Provider } from "react-redux";
import { IChildren } from "@/types";
import { store } from "@/lib";

export const Providers: FC<IChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
