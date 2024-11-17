import { cn } from "@coinbase/onchainkit/theme";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-block text-lg group",
        props.className,
        props.disabled && "pointer-events-none opacity-90"
      )}
    >
      <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg ">
        <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-white"></span>
        <span className="relative font-semibold">{children}</span>
      </span>
      <span
        className="absolute bottom-0 right-0 w-full mx-auto h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-primary rounded-lg group-hover:mb-0 group-hover:mr-0"
        data-rounded="rounded-lg"
      ></span>
    </button>
  );
}
