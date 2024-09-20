"use client";

import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProfileCompletionCard = () => {
  const profile_completion = useAppSelector(
    (state) => state.auth.user.profile_completion
  );

  return (
    <div className="sm:p-4 p-2 bg-white rounded-lg shadow-lg w-full">
      <div className="h-7 justify-start items-center gap-2 inline-flex">
        <Image
          src="/assets/icons/rocket-icon.svg"
          alt="Rocket Icon"
          width={20}
          height={20}
          className="w-5 h-5 object-contain"
        />
        <h2 className="sm:text-base text-sm font-medium leading-7">
          Complete your profile
        </h2>
      </div>
      <div className="relative pt-1 mt-2">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-lg bg-secondary">
          <div
            style={{ width: `${profile_completion}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
      </div>
      <Link
        href={"/settings"}
        className={cn("w-full mt-4", buttonVariants({ variant: "default" }))}
      >
        Complete Profile
      </Link>
    </div>
  );
};

export default ProfileCompletionCard;
