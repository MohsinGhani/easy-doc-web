"use client";

import React from "react";
import Link from "next/link";
import { UserPopup } from "@/components/navbar/UserPopup";
import { useAppSelector } from "@/lib/hooks";
import LogoText from "../LogoText";
import SelectLanguage from "./SelectLanguage";
import NavLinks from "./NavLinks";
import Hamburber from "./Hamburber";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export const Navbar = ({ className }: { className?: string }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return (
    <header
      className={cn(
        "@container sticky top-0 z-50 w-full flex items-center justify-center  bg-background/80 backdrop-blur-sm lg:px-[100px] md:px-[50px] sm:px-[30px] px-4 py-4 max-w-[1400px] mx-auto",
        className
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-10">
          <div className="flex items-center space-x-3 cursor-pointer">
            <Link href="/" className="flex space-x-2 items-center">
              <LogoText />
            </Link>
          </div>

          <NavLinks />
        </div>

        <div className="hidden @3xl:flex items-center gap-5">
          <SelectLanguage />

          {isLoggedIn ? (
            <>
              <UserPopup />
            </>
          ) : (
            <>
              <Link
                href={`/auth/sign-up`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "rounded-full text-primary border-primary font-bold"
                )}
              >
                Register
              </Link>
              <Link
                href={`/auth/sign-in`}
                className={cn(
                  buttonVariants({ size: "xl" }),
                  "rounded-full font-bold"
                )}
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Only Visible on Mobile */}
        <Hamburber />
      </div>
    </header>
  );
};
