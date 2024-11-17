"use client";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type {
  TransactionError,
  TransactionResponse,
} from "@coinbase/onchainkit/transaction";
import type { Address, ContractFunctionParameters } from "viem";
import {
  BASE_SEPOLIA_CHAIN_ID,
  mintABI,
  mintContractAddress,
} from "../constants";
import { cn } from "@coinbase/onchainkit/theme";
import { BASE_CONTRACT } from "src/lib/constants";
import { abi } from "assets/abi/lottery";

export default function TransactionWrapper({
  address,
  disabled,
  className,
  numbers,
  selectedChain,
}: {
  address: Address;
  disabled?: boolean;
  className?: string;
  numbers?: number[];
  selectedChain?: string;
}) {
  console.log(address);
  const beneficiary = "0xB109F00748B094d28561f267899e76799F4fdF15";

  const contracts = [
    {
      address: BASE_CONTRACT,
      abi,
      functionName: "purchase",
      args: [[[address, numbers]], beneficiary],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error("Transaction error:", err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log("Transaction successful", response);
  };

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={contracts}
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={handleError}
        onSuccess={handleSuccess}
      >
        <TransactionButton
          text={address ? "Purchase" : "Please Sign In"}
          className={cn(
            "mx-auto inline-block text-lg border-2 border-black bg-white py-2 px-3 group button",
            disabled && "pointer-events-none opacity-90",
            className
          )}
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
