"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { useMemo } from "react";
import { http, createConfig } from "wagmi";
import { baseSepolia, celoAlfajores } from "wagmi/chains";
import { NEXT_PUBLIC_WC_PROJECT_ID } from "./config";

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? "";
  if (!projectId) {
    const providerErrMessage =
      "To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable";
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: "Recommended Wallet",
          wallets: [coinbaseWallet],
        },
        {
          groupName: "Other Wallets",
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: "onchainkit",
        projectId,
      }
    );

    const wagmiConfig = createConfig({
      chains: [baseSepolia, celoAlfajores],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [baseSepolia.id]: http(),
        [celoAlfajores.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
