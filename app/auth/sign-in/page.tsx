"use client";

// Importing the SignInForm component from the @/components/auth directory
import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";

// Exporting a default function named SignInPage
// This function returns a JSX element which is an instance of the SignInForm component
export default function SignInPage() {
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
        <SignInForm />
      </div>
    </div>
  );
}
