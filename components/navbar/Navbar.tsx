"use client";

import React from "react";
import Link from "next/link";
import { UserPopup } from "@/components/navbar/UserPopup";
// import { ModeToggle } from "@/components/theme/theme-toggle";
import { useAppSelector } from "@/lib/hooks";
import LogoText from "../LogoText";
import CustomButton from "../auth/CustomButton";
import SelectLanguage from "./SelectLanguage";
import NavLinks from "./NavLinks";

export const Navbar = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  return (
    <header className="w-full flex items-center justify-center bg-background px-[100px] mt-8 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-10">
          <div className="flex items-center space-x-3 cursor-pointer">
            <Link href="/" className="flex space-x-2 items-center">
              <LogoText />
            </Link>
          </div>

          <NavLinks />
        </div>

        <div className="flex items-center gap-5">
          {/* <ModeToggle /> */}

          <SelectLanguage />

          {isLoggedIn ? (
            <>
              <UserPopup />
            </>
          ) : (
            <>
              <Link href={`/auth/sign-up`} className="font-bold">
                <CustomButton
                  variant={"outline"}
                  className="rounded-full text-primary border-primary"
                >
                  Register
                </CustomButton>
              </Link>
              <Link href={`/auth/sign-in`} className="font-bold">
                <CustomButton className="rounded-full">Log In</CustomButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
