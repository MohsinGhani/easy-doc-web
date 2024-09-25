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
import { Car } from "../icons";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

const FirstSection = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <div className="absolute top-10 md:top-32 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row justify-between w-[90%] p-4 z-50">
      <div className="lg:w-1/2 w-full lg:text-start text-center">
        <h1 className="text-[#121212] text-[24px] md:text-[54px] font-bold leading-tight lg:leading-[68.04px] tracking-[0.02em]">
          Medical Care Now <br />
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

        <AppointmentSection />

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-[60%] hidden lg:block">
          <Image
            src="/assets/images/landingpagellipse-bg.png"
            width={1000}
            height={600}
            alt="landingpagebottom-bg"
          />
        </div>
      </div>
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
  <div className="absolute -bottom-36 left-1/2 transform -translate-x-1/2 w-[45%] hidden lg:block z-50">
    <Image
      src="/assets/images/landingpagemain-img.png"
      width={1100}
      height={900}
      alt="man-image"
    />
    <div className="w-full h-32 rounded-full bg-white flex items-center justify-center">
      <div className="flex gap-7 w-[90%] px-10">
        <div className="w-60 h-24">
          <div className="text-[#909090]">Consultation type</div>
          <div className="flex items-center gap-2">
            <Car className="fill-white stroke-2 h-4" />
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
        <div className="w-60 h-24">
          <div className="text-[#909090]">Location</div>
          {/* Add location select or input here if needed */}
        </div>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  return (
    <div>
      <Navbar className="relative" />
      <HeroImages /> {/* Behind FirstSection */}
      <FirstSection />
      {/* Contains the main image + the consultation type + location selector. */}
      <AboutusPage />
    </div>
  );
};

export default LandingPage;
