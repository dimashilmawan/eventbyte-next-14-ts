import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center md:flex-between wrapper flex flex-col gap-3 py-4 text-center md:flex-row ">
        <Logo />
        <p>2024 EventByte. All Rights reserved.</p>
      </div>
    </footer>
  );
};
