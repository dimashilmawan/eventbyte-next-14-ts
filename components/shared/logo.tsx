import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo Image"
          width={128}
          height={38}
          className="h-auto w-24"
        />
        {/* <p>EventByte</p> */}
      </div>
    </Link>
  );
};
