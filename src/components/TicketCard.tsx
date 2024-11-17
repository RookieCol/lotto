import Image from "next/image";

export default function TicketCard() {
  return (
    <div className="w-full flex flex-col">
      <Image
        src={"/images/noun2.png"}
        alt=""
        width={100}
        height={100}
        className="w-1/2 mx-auto h-20 rounded-xl object-cover"
      />
    </div>
  );
}
