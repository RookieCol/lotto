import { Clock, FileBadge, Ticket, Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LotteryCard({
  img,
  description,
  name,
  prize,
  symbol,
  time,
  price,
  token,
  tickets,
}: {
  img: string;
  description: string;
  name: string;
  prize: string;
  symbol: string;
  time: string;
  price: string;
  token: string;
  tickets: string;
}) {
  return (
    <Link
      href={"/lotteries/bbe83gb"}
      className="w-full p-3  rounded-xl h-[150px] max-h-[150px] relative"
    >
      <div className="flex gap-3 h-full">
        <Image
          src={img}
          alt={name}
          width={100}
          height={100}
          className="rounded-xl object-cover min-w-[110px] h-full"
        />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <h4 className="font-semibold text-xl line-clamp-1 ">{name}</h4>{" "}
            <p className="text-xs opacity-80 whitespace-nowrap mt-1.5">
              {tickets} tickets
            </p>
          </div>
          <p className="text-xs line-clamp-2 opacity-80 mt-1">{description}</p>
          <div className="grid grid-cols-2 grow gap- mt-1 *:flex *:items-center *:gap-1 *:text-xs gap-2">
            <p className="text-primary">
              <Trophy className="size-4" /> {prize} {token}
            </p>
            <p>
              <FileBadge className="size-4" /> {symbol}
            </p>
            <p>
              <Clock className="size-4" /> {time}
            </p>
            <p>
              <Ticket className="size-4" /> {price} {token}
            </p>
          </div>
        </div>
      </div>
      <div className="selector">
        <div className="edge"></div>
        <div className="edge is--2"></div>
        <div className="edge is--3"></div>
        <div className="edge is--4"></div>
      </div>
    </Link>
  );
}
