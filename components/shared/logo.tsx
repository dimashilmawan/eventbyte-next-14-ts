import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex-center gap-2">
        <Image
          src="/assets/images/eventbyte-logo.png"
          alt="Logo Image"
          width={128}
          height={38}
          className="h-auto w-[2.75rem]"
        />
        <p className=" font-poppins text-lg font-semibold text-[#003c80]">
          EventByte
        </p>
      </div>
    </Link>
  );
};
