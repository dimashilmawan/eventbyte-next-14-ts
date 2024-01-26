import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center md:flex-between wrapper flex flex-col gap-3 py-4 text-center md:flex-row ">
        <Link className="w-32 " href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo Image"
            width={128}
            height={38}
          />
        </Link>
        <p>2024 EventByte. All Rights reserved.</p>
      </div>
    </footer>
  );
};
