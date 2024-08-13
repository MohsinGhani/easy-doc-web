import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// LandingPage component renders the landing page of the application.
const LandingPage = () => {
  return (
    <div className="w-full mx-auto flex justify-between h-full gap-5 px-12">
      {/* Container for the landing page content */}
      <div className="space-y-7 flex flex-col text-center items-center justify-center h-[400px] mx-auto mt-20">
        {/* Heading of the landing page */}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Welcome to <span className="text-blue-500">Doctory</span>
        </h1>
        {/* Description of the landing page */}
        <p className="max-w-md text-xl mx-auto">
          A medical <u className="border-b border-blue-500">appointment</u>{" "}
          scheduling platform <br /> for{" "}
          <span className="text-blue-500">patients</span> and{" "}
          <span className="text-blue-500">doctors</span>
        </p>

        {/* Container for the sign-up buttons */}
        <div className="flex items-center gap-4 w-fit max-w-md mx-auto">
          {/* Button for patients to join */}
          <Link href={`/auth/sign-up`} className="font-bold">
            <Button size={"lg"}>Join Now!</Button>
          </Link>
          {/* Separator text */}
          <span className="text-sm text-muted-foreground">OR</span>
          {/* Button for doctors to join */}
          <Link href={`/auth/sign-up?role=doctor`} className="font-bold">
            <Button size={"lg"} variant={"secondary"}>
              Join as a Doctor..
            </Button>
          </Link>
        </div>
      </div>
      {/* Image of the landing page */}
      <Image
        src={"/sign-up-img.png"}
        width={500}
        height={1000}
        alt="sign up image"
      />
    </div>
  );
};

export default LandingPage;
