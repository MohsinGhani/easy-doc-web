"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const SuccessPage = () => {
  return (
    <div className="fixed inset-0 z-[10] bg-black/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-screen w-full h-full flex items-center justify-center">
      <div className="w-[422px] h-[396px] p-16 rounded-[10px] bg-white flex-col justify-center items-center gap-2.5 inline-flex border">
        <div className="h-[270px] flex-col justify-start items-center gap-8 flex">
          <Image
            src={"/assets/images/success.png"}
            alt="logo"
            width={160}
            height={144}
          />
          <div className="self-stretch h-[94px] flex-col justify-start items-center gap-6 flex">
            <div className="text-black text-2xl font-medium">
              Account Created!
            </div>
            <Link href={"/"}>
              <Button size={"xl"} className="w-[274px] h-10">
                Okay
              </Button>{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
