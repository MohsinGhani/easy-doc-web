"use client";

import React from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="w-[422px] h-[396px] p-16 bg-white rounded-[10px] flex-col justify-center items-center gap-2.5 inline-flex border">
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
            <CustomButton className="w-[274px] h-10">Okay</CustomButton>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
