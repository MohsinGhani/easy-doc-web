"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../navbar/Navbar";
import CarousalsSlider from "../CarousalsSlider";
import AboutusPage from "./AboutusPage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Car, TitleEmphasizer } from "../icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { Card, CardContent } from "../ui/card";

const FirstSection = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <div className="absolute top-10 md:top-32 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row justify-between w-[90%] p-4 z-50">
      <div className="lg:w-1/2 w-full lg:text-start text-center z-10">
        <h1 className="text-[#121212] text-[24px] md:text-[54px] font-bold leading-tight lg:leading-[68.04px] tracking-[0.02em]">
          <span className="whitespace-nowrap relative">
            Medical Care Now
            <TitleEmphasizer
              width={120}
              height={120}
              className="absolute -right-24 -top-16"
            />
          </span>
          <br />
          Simplified For <br />
          <span className="text-primary">Everyone</span>
        </h1>
        <p className="text-[14px] md:text-[16px] font-normal leading-normal lg:leading-[36px] text-[#5C5C5B] mt-4">
          You Only Have To Know One Thing That You Can <br />
          Learn Anything Anywhere To Do You Discover <br />
          Yourself.
        </p>
        <Link
          href={!isLoggedIn ? `/auth/sign-in` : `doctors`}
          className={cn(
            buttonVariants({ size: "xl" }),
            "rounded-full font-bold mt-3"
          )}
        >
          {!isLoggedIn ? "Join Now!" : "Book an appointment"}
        </Link>
      </div>

      <AppointmentSection />

      <CarousalsSlider className={"hidden lg:block"} />
    </div>
  );
};

const HeroImages = () => (
  <>
    <div className="flex justify-between items-center relative">
      <div className="w-96 hidden md:block">
        <Image
          className="w-full"
          src="/assets/images/landingpage-bg.png"
          width={400}
          height={200}
          alt="landingpage-bg"
        />
      </div>
      <div className="top-0 right-0 z-50">
        <Image
          src="/assets/images/landingpagecircle-bg.png"
          width={500}
          height={400}
          alt="landingpagecircle-bg"
        />
      </div>
    </div>
  </>
);

const AppointmentSection = () => (
  <div className="absolute inset-0 left-1/2 -translate-x-1/2 top-0 flex flex-col items-center justify-center w-full min-h-[700px]">
    {/* Blue Half Circle */}
    <div className="absolute overflow-hidden w-[70%] h-[60%] bottom-0 bg-primary rounded-tl-full rounded-tr-full -z-[1]" />

    {/* Image Overlay */}
    <div className="absolute flex items-center justify-center w-1/2 bottom-4">
      <Image
        src="/assets/images/landingpagemain-img.png"
        width={1000}
        height={1000}
        alt="man-image"
        className="w-full h-full object-contain"
      />
    </div>

    {/* Information Section */}
    <Card className="relative w-full md:w-[80%] lg:w-[70%] bg-white flex items-center justify-center z-30 -bottom-96 rounded-full">
      <CardContent className="flex items-center justify-between flex-wrap gap-5 w-full">
        <div className="w-60">
          <div className="text-[#909090]">Consultation Type</div>
          <div className="flex items-center gap-2">
            <Car className="fill-current text-primary stroke-2 h-4" />
            <Select>
              <SelectTrigger className="w-[180px] border-none">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
                <SelectItem value="acme-consultation">
                  Acme Consultation
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-60">
          <div className="text-[#909090]">Location</div>
          {/* Add location select or input here if needed */}
        </div>
      </CardContent>
    </Card>
  </div>
);

const LandingPage = () => {
  return (
    <div>
      <Navbar className="relative" />
      <HeroImages /> {/* Behind FirstSection */}
      {/* Below Contains the main image + the consultation type + location selector. */}
      <FirstSection />
      <AboutusPage />
    </div>
  );
};

export default LandingPage;
