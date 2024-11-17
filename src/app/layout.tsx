import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "../config";

import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const OnchainProviders = dynamic(
  () => import("src/components/OnchainProviders"),
  {
    ssr: false,
  }
);

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Onchain App Template",
  description: "Built with OnchainKit",
  openGraph: {
    title: "Onchain App Template",
    description: "Built with OnchainKit",
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <OnchainProviders>
          <div
            className="pattern-cross pattern-orange-500 pattern-bg-black absolute inset-0
  pattern-size-4 pattern-opacity-20 -z-10"
          ></div>
          {children}
          <ToastContainer />
        </OnchainProviders>
      </body>
    </html>
  );
}
