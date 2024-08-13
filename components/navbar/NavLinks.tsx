import { navLinks } from "@/constants";
import Link from "next/link";
import React from "react";

interface LinkItem {
  label: string;
  location: string;
}

const NavLinks = () => {
  return (
    <div className="items-center gap-10 hidden md:flex">
      {navLinks.map(({ label, location }: LinkItem, index: number) => (
        <Link href={location} key={index}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
