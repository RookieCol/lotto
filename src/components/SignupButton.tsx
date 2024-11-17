"use client";
import WalletWrapper from "./WalletWrapper";

export default function SignupButton() {
  return (
    <WalletWrapper
      className="ockConnectWallet_Container min-w-[90px] shrink relative inline-block text-lg border-2 border-black bg-white py-2 px-3 group button"
      text="Sign Up"
    />
  );
}
