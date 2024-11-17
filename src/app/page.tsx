"use client";
import { useAccount } from "wagmi";
import Hero from "src/components/Hero";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-svh justify-center max-w-full flex-col px-1 md:w-[1008px]"
    >
      <Hero />
    </motion.div>
  );
}
