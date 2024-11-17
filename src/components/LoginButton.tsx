"use client";
import WalletWrapper from "./WalletWrapper";

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[70px] p-2 text-sm relative inline-block border-2 border-black bg-white py-2 px-3 group button"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
