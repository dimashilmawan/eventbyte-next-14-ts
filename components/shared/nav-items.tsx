"use client";
import { navLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItems = () => {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
      {navLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${isActive ? "text-primary-500" : ""} whitespace-nowrap text-lg font-medium`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};
