import Image from "next/image";
import Link from "next/link";
import { NavItems } from "./nav-items";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { MobileNav } from "./mobile-nav";
import { Logo } from "./logo";
import { Container } from "./container";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <Container className="flex-between wrapper relative h-[4.250rem] ">
        <Logo />
        <SignedIn>
          <nav className="absolute left-1/2 top-1/2 hidden w-fit -translate-x-1/2 -translate-y-1/2 md:flex">
            <NavItems />
          </nav>
        </SignedIn>
        <div className="flex-center gap-3 ">
          <SignedIn>
            <UserButton
              appearance={{ elements: { avatarBox: "w-9 h-9" } }}
              afterSignOutUrl="/"
              afterMultiSessionSingleSignOutUrl="/"
            />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </Container>
    </header>
  );
};
