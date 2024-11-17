"use client";

import { motion } from "framer-motion";
import SignupButton from "./SignupButton";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./LoginButton";

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2"
    >
      <Link href={"/"}>
        <Image src="/images/logo.png" alt="logo" width={60} height={100} />
      </Link>
      <LoginButton />
    </motion.div>
  );
}
