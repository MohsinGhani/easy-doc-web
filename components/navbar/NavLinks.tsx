import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import React from "react";

interface LinkItem {
  label: string;
  location: string;
}

const NavLinks = () => {
  return (
    <div className="hidden @6xl:flex items-center gap-10">
      {NAV_LINKS.map(({ label, location }: LinkItem, index: number) => (
        <Link href={location} key={index}>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
