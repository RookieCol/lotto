"use client";

import { motion } from "framer-motion";
import LotteryCard from "src/components/LotteryCard";
import Navbar from "src/components/Navbar";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-svh w-full"
    >
      <h1 className="text-[3.5em] text-center font-pp font-semibold pt-[80px]">
        Lotteries
      </h1>
      <div className="px-4 flex flex-col w-full gap-5">
        <h3 className="text-[1.6em] font-pp font-semibold">
          Current lotteries ( 3 ):
        </h3>
        <div className="flex flex-col gap-4">
          <LotteryCard
            name="Green Future"
            description="Funds environmental and sustainability projects like renewable energy or reforestation."
            img="/images/noun3.png"
            price="0.0001"
            token="ETH"
            prize="0.05"
            time="5min"
            symbol="GFT"
            tickets="31"
          />
          <LotteryCard
            name="Education Fund "
            description="Supports education-related public goods, such as scholarships, schools, or digital learning platforms."
            img="/images/noun1.png"
            token="USDC"
            price="0.06"
            prize="750"
            time="20min"
            symbol="EDF"
            tickets="22"
          />
          <LotteryCard
            name="Healt Bridge Lotto"
            description="Funds healthcare initiatives like free clinics, vaccination programs, or mental health support."
            img="/images/noun2.png"
            token="DAI"
            price="0.03"
            prize="500"
            time="10min"
            symbol="HLT"
            tickets="10"
          />
        </div>
      </div>
    </motion.div>
  );
}
