import { Providers } from "@/contexts";
import { IChildren } from "@/types";
import type { Metadata } from "next";
import { FC } from "react";
import "./globals.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const metadata: Metadata = {
  title: "Kluyuran",
};

const RootLayout: FC<IChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
