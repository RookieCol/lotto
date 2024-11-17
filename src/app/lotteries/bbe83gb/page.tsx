"use client";

import { Select, Option } from "@material-tailwind/react";
import { abi } from "assets/abi/lottery";
import { motion } from "framer-motion";
import { Clock, FileBadge, Ticket, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import TicketCard from "src/components/TicketCard";
import { BASE_CONTRACT, NUMBERS } from "src/lib/constants";
import { useAccount, useConfig } from "wagmi";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { GAME_PERIOD } from "src/constants";
import { cn } from "@coinbase/onchainkit/theme";
import Button from "src/components/Button";
import { toast } from "react-toastify";

const beneficiary = "0x63b1EfC5602C0023BBb373F2350Cf34c2E5F8669";

export default function Page() {
  const { address } = useAccount();
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [minutesLeft, setMinutesLeft] = useState<number | null>(null);
  const [lotteryEnded, setLotteryEnded] = useState<boolean>(false);
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [buyTicketLoading, setBuyTicketLoading] = useState<boolean>(false);
  const config = useConfig();
  const [selectedChain, setSelectedChain] = useState<string>("");

  useEffect(() => {
    initial();
    fetchUserTickets();
  }, []);

  const initial = async () => {
    setInitLoading(true);
    try {
      const currentGame = await readContract(config, {
        address: BASE_CONTRACT,
        abi,
        functionName: "currentGame",
      });

      const gameData = await readContract(config, {
        address: BASE_CONTRACT,
        abi,
        functionName: "gameData",
        args: [currentGame[1]],
      });

      const initialDate = Number(gameData[1]) * 1000;
      const end = initialDate + GAME_PERIOD;
      const now = Date.now();

      if (now > end) {
        setLotteryEnded(true);
      } else {
        const differenceInMs = end - now;
        const minutesLeft = Math.floor(differenceInMs / 1000 / 60);
        setMinutesLeft(minutesLeft);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setInitLoading(false);
    }
  };

  const handleCircleClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else if (selectedNumbers.length < 5) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const fetchUserTickets = async () => {
    if (!address) return;
    const endpoint =
      "https://api.studio.thegraph.com/query/77216/lot/version/latest";

    const query = `
      query purchasedTickets {
        ticketPurchaseds {
          id
          gameId
        }
      }
    `;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setUserTickets(data.data.ticketPurchaseds);
    } catch (error) {
      console.error("Error fetching purchased tickets:", error);
      return [];
    }
  };

  const handleBuyTicket = async () => {
    setBuyTicketLoading(true);
    if (!address) {
      return;
    }
    try {
      const hash = await writeContract(config, {
        address: BASE_CONTRACT,
        abi,
        functionName: "purchase",
        // @ts-ignore
        args: [[[address, selectedNumbers.sort((a, b) => a - b)]], beneficiary],
      });
      await waitForTransactionReceipt(config, { hash, confirmations: 1 });
      toast.success("Ticket bought successfully");
      setSelectedNumbers([]);
    } catch (error) {
      console.error(error);
    } finally {
      setBuyTicketLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-svh w-full"
    >
      <h1 className="text-[3.5em] text-center font-pp font-semibold pt-[80px]">
        Green Future Lottery
      </h1>
      {initLoading ? (
        <p className="opacity-80 text-center">Loading...</p>
      ) : lotteryEnded ? (
        <p className="opacity-80 text-center">Lottery has ended</p>
      ) : (
        <div className="w-full grid grid-cols-2 px-4 ">
          <p className="text-center  opacity-90 text-primary font-bold">
            Picked numbers:{" "}
            <span className="text-white">{selectedNumbers.length}/5</span>
          </p>
          <p className="text-center  opacity-90 text-primary font-bold">
            Time left: <span className="text-white">5 min</span>
          </p>
        </div>
      )}
      <div className="mt-5 flex flex-col px-4 gap-5 w-full select">
        <div
          className={cn(
            "w-full grid grid-cols-4 grid-rows-3 gap-4 p-4 rounded-xl relative",
            initLoading || lotteryEnded ? "pointer-events-none" : ""
          )}
        >
          {NUMBERS.map((number, index) => (
            <div
              key={index}
              onClick={() => handleCircleClick(number)}
              className={`flex items-center justify-center w-20 h-20 rounded-full text-white font-bold text-lg cursor-pointer transition ${
                selectedNumbers.includes(number)
                  ? "bg-orange-800/70 border-4 border-primary"
                  : "border-2 border-gray-400"
              }`}
            >
              {number}
            </div>
          ))}
          <div className="selector">
            <div className="edge"></div>
            <div className="edge is--2"></div>
            <div className="edge is--3"></div>
            <div className="edge is--4"></div>
          </div>
        </div>

        {/* @ts-ignore */}
        <Select
          className="text-white border-white"
          label="Select a chain"
          placeholder={undefined}
          onChange={(value) => setSelectedChain(value || "")}
        >
          <Option className="flex items-center gap-2" value="base">
            <Image src={"/images/base.png"} alt="base" width={25} height={25} />{" "}
            Base Sepolia
          </Option>
          <Option className="flex items-center gap-2" value="celo">
            <Image src={"/images/celo.png"} alt="celo" width={25} height={25} />{" "}
            Celo Alfajores
          </Option>
          <Option className="flex items-center gap-2" value="eth">
            <Image
              src={"/images/eth.png"}
              alt="ethereum"
              width={25}
              height={25}
            />{" "}
            Ethereum Sepolia
          </Option>
          <Option className="flex items-center gap-2" value="polygon">
            <Image
              src={"/images/polygon.png"}
              alt="polygon"
              width={25}
              height={25}
            />{" "}
            Polygon Amoy
          </Option>
        </Select>

        <p className="font-pp text-3xl tracking-wide">About Green Future:</p>

        <div className="pb-[80px]">
          <Image
            src={"/images/noun3.png"}
            alt="logo"
            width={100}
            height={100}
            className="rounded-xl mt-1 float-left mr-5"
          />

          <p>
            Funds impactful environmental and sustainability projects aimed at
            creating a greener future. From advancing renewable energy solutions
            to restoring forests, these initiatives work to combat climate
            change and promote ecological balance. Every contribution helps
            build a healthier planet for generations to come.
          </p>
          <div className="w-full grid grid-cols-2 text-lg gap-2 mt-5">
            <div className="flex flex-col gap-2">
              <h4 className="flex items-center gap-2 font-semibold">
                <Trophy className="size-4" /> Prize
              </h4>
              <p className="opacity-80">0.05 ETH</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="flex items-center gap-2 font-semibold">
                <FileBadge className="size-4" /> Ticket symbol
              </h4>
              <p className="opacity-80">GFT</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="flex items-center gap-2 font-semibold">
                <Clock className="size-4" /> Time left
              </h4>
              <p className="opacity-80">5 min</p>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="flex items-center gap-2 font-semibold">
                <Ticket className="size-4" /> Ticket cost
              </h4>
              <p className="opacity-80">0.05 ETH</p>
            </div>
          </div>

          <p className="font-pp text-3xl tracking-wide my-5">Your tickets:</p>

          <div className="grid grid-cols-2 gap-3">
            {userTickets?.map((ticket: any, index: number) => (
              <TicketCard key={index} ticket={ticket} />
            ))}
          </div>

          {selectedNumbers.length === 5 && (
            <motion.div
              className="fixed bottom-3 w-[90%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                className="w-full text-center"
                disabled={!address || buyTicketLoading}
                onClick={handleBuyTicket}
              >
                {!address
                  ? "Please connect your wallet"
                  : buyTicketLoading
                    ? "Buying..."
                    : "Buy tickets"}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
