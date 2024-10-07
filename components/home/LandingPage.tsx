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
import {  Car , TitleEmphasizer   } from "../icons";
import { buttonVariants , Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";
import { Card, CardContent } from "../ui/card";
import SvgLocation from "../icons/Location";
import SvgCalendar from "../icons/Calendar";
import MedicalServices from "./MedicalServices";
import SpecialistDoctors from "./SpecialistDoctors";
import PatientsAboutusSection from "./PatientsAboutusSection";
import BecomeDoctorTemplate from "./BecomeDoctorTemplate";
import AccordianSection from "./AccordianSection";
import WorkingProcessPage from "./WorkingProcessPage";

const FirstSection = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <div className="absolute top-28 md:top-32 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row justify-between w-[90%] p-4 z-50     ">
      <div className="lg:w-1/2 w-full lg:text-start text-center z-10">
        <h1 className="text-[#121212] text-[30px] md:text-[54px] font-bold leading-tight lg:leading-[68.04px] tracking-[0.02em] ">
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
  )
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
      <div className="top-0 right-0 z-50 xl:block lg:hidden">
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
  <div className="absolute inset-0 left-1/2 -translate-x-1/2 top-0 flex flex-col items-center justify-center w-full min-h-[500px] md:min-h-[700px]">
    <div className="absolute overflow-hidden w-[90%] sm:w-[70%] h-[30%] sm:h-[60%] -bottom-24 left-1/2 transform 
    -translate-x-1/2 bg-primary rounded-tl-full rounded-tr-full -z-[1] md:bottom-0 " />
<div className=" md:hidden pt-96">
<Image
          src="/assets/images/doctorimg.png"
          width={300}
          height={100}
          alt="doc-img"
        />
</div>

    <div className="absolute hidden md:flex items-center justify-center w-1/2 bottom-4">
      <Image
        src="/assets/images/landingpagemain-img.png"
        width={1000}
        height={1000} 
        alt="man-image"
        className="w-full h-full object-contain"
      />
    </div>

    <Card className="relative w-full md:w-[80%] xl:w-[70%] lg:w-[70%] bg-white  items-center justify-center z-30 -bottom-96 rounded-full hidden md:flex  ">
      <CardContent className="flex items-center justify-between flex-wrap gap-5 w-full ">
      <div className="flex items-center xl:gap-8  ml-10 ">
  <div className="w-48 pl-4">
    <div className="text-[#909090]">Consultation Type</div>
    <div className="flex items-center gap-2">
      <Car className="text-primary stroke-2 h-6" />
      <Select>
        <SelectTrigger className="w-[180px] border-none">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="routine-checkup">Routine Checkup</SelectItem>
          <SelectItem value="acme-consultation">Acme Consultation</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>

  <div className="w-40 ">
    <div className="text-[#909090] pb-2">
      Location
      <div className="flex pt-1 pr-2">
        <div >
          <SvgLocation />
        </div>
        <div className="text-[]">Choose Location</div>
      </div>
    </div>
    
  </div>

  <div className="h-12 w-px bg-gray-300 hidden md:block"></div>

  <div className="flex items-center gap-6">
    <div>
      <div className="text-[#909090]">Appointment date</div>
      <div className="flex items-center gap-2">
        <SvgCalendar className="text-primaryS stroke-2 h-6 " />
        <Select>
          <SelectTrigger className="w-[160px] border-none pt-1">
            <SelectValue className="font-bold" placeholder="17 July 2021" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="routine-checkup">20 July 2021</SelectItem>
            <SelectItem value="acme-consultation">12 July 2021</SelectItem>
            <SelectItem value="other">10 July 2021</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    <div>
      <Button
        className={cn(
          buttonVariants({ size: "xl" }),
          "rounded-full font-bold mt-3"
        )}
      >
        Search
      </Button>
    </div>
  </div>
</div>
 </CardContent>
    </Card>
  </div>
);

const LandingPage = () => {
  return (
    <div>
      <Navbar className="relative" />
      <HeroImages /> 
      <FirstSection />
      <AboutusPage />
      <MedicalServices/>
      <WorkingProcessPage/>
      <SpecialistDoctors  
  profileText="FEATURED PROFILE" 
  headingText="OUR SPECIALIST DOCTORS"
  descriptionText={
  <>
  You only have to know one thing that you can learn anything <br /> anywhere to discover yourself.
  </>}/>
<PatientsAboutusSection
 profileText="TESTIMONIAL" 
 headingText="What Our Patient Says About Us"
 descriptionText={
 <>
You only have to know one thing that you can learn anything <br /> anywhere to discover yourself.
</>} />
<BecomeDoctorTemplate/>
<AccordianSection/>
    </div>
)
};

export default LandingPage;