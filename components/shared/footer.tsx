import Image from "next/image";
import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";

export const Footer = () => {
  return (
    <footer className="border-t">
      <Container className="flex-center md:flex-between flex-col gap-3 py-5 text-center md:h-[4.250rem] md:flex-row ">
        <Logo />
        <p>2024 EventByte. All Rights reserved.</p>
      </Container>
    </footer>
  );
};
