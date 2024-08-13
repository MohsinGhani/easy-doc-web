"use client";

import Image from "next/image";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center w-full h-full gap-[88px]">
      <div className="hidden md:block w-full max-w-[700px] h-[936px]">
        <Image
          src="/assets/images/register-img.png"
          alt="logo"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="w-full md:w-[40%] mx-auto md:pr-[130px] lg:px-1 sm:px-10 px-5">
        <SignUpForm />
      </div>
    </div>
  );
}
