import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex-center gap-1">
        <Image
          src="/assets/images/eventbyte-logo.png"
          alt="Logo Image"
          width={128}
          height={38}
          className="-ml-2 h-auto w-[4.5rem]"
        />
        <p className="-ml-3 font-poppins text-lg font-semibold text-[#003c80]">
          EventByte
        </p>
      </div>
    </Link>
  );
};
