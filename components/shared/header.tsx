import Image from "next/image";
import Link from "next/link";
import { NavItems } from "./nav-items";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { MobileNav } from "./mobile-nav";

export const Header = () => {
  return (
    <header className="w-full border-b ">
      <div className="flex-between wrapper py-4">
        <Link className="w-32" href="/">
          <Image
            src="/assets/images/logo.svg"
            alt="Logo Image"
            width={128}
            height={38}
          />
        </Link>
        <nav className="hidden w-fit md:flex">
          <NavItems />
        </nav>
        <div className="flex-center gap-3 ">
          <SignedIn>
            <UserButton
              appearance={{ elements: { avatarBox: "w-9 h-9" } }}
              afterSignOutUrl="/"
            />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};
