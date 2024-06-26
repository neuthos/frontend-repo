import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {StyledRoot} from "./StyledRoot";
import dynamic from "next/dynamic";
const ReduxProvider = dynamic(() => import("@/store/provider"), {
  ssr: false,
});

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <StyledRoot>{children}</StyledRoot>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
