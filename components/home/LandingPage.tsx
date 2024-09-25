import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link"; 
import { Navbar } from "../navbar/Navbar";
import CarousalsSlidder from "../CarousalsSlidder"
import AboutusPage from "./AboutusPage";
import { Calendar } from "../ui/calendar";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuCheckboxItem } from "../ui/dropdown-menu";
// import { Select } from "@/components/ui/select"; // Adjust the import based on your structure
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LandingPage = () => {
  return (
    <div>
      <Navbar className="relative" />
   <div className="flex justify-between">
          <div className="w-96  hidden md:block">
            <Image
              className="w-full"
              src={"/assets/images/landingpage-bg.png"}
              width={400}
              height={200}
              alt="landingpage-bg"
            />
          </div> 
           <div className=" top-0 right-0 z-50">
            <Image
              src={"/assets/images/landingpagecircle-bg.png"}
              width={500}
              height={400}
              alt="landingpagecircle-bg"
            />
          </div>
        </div> 
        <div className="absolute top-10 md:top-32 left-1/2 z-50 transform -translate-x-1/2 flex flex-col md:flex-row justify-between w-[90%] md:w-[90%] p-4 ">
          <div className="md:w-1/2 w-full ">
            <div className="text-[#121212] font-[Outfit] text-[24px] md:text-[54px] font-bold leading-[48px] md:leading-[68.04px] tracking-[0.02em] text-left">
              Medical Care Now <br />
              Simplified For <br />
              <span className="text-[#4D77FF]">Everyone</span>
            </div>

            <div className="font-[Outfit] text-[14px] md:text-[16px] font-normal leading-[28px] md:leading-[36px] text-left text-[#5C5C5B] mt-4">
              <p>
                You Only Have To Know One Thing That You Can <br /> Learn
                Anything Anywhere To Do You Discover
                <br /> Yourself.
              </p>
            </div>

            <div className="mt-3">
              <Link
                href={`/auth/sign-in`}
                className={cn(
                  buttonVariants({ size: "xl" }),
                  "rounded-full font-bold"
                )}
              >
                Book an appointment
              </Link>
            </div>
          </div>

<div >
  <CarousalsSlidder/>
</div>
        </div>

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-[60%] hidden md:block">
          <Image
            src={"/assets/images/landingpagellipse-bg.png"}
            width={1000}
            height={600}
            alt="landingpagebottom-bg"
          />
        </div>

        <div className="absolute -bottom-36 left-1/2 transform -translate-x-1/2 -translate-y-1 z-50 w-[45%] hidden md:block">
          <Image
            src={"/assets/images/landingpagemain-img.png"}
            width={1100}
            height={900}
            alt="man-image"
          />
        
         
          
          <div className=" w-[100%] h-32 rounded-full  bg-white flex">
          <div className="flex gap-7">
<div className="flex justify-between pt-6 w-[90%] pl-10">
          <div className=" w-60 h-24">
            <div className="text-[#909090]">
            Consultation type
            </div>
            <div className="flex gap-2">
            <Image
            src={"/assets/icons/Car.svg"}
            width={20}
            height={20}
            alt="man-image"
          />
          <Select >
  <SelectTrigger className="w-[180px] border-none">
    <SelectValue placeholder="Select" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>


            </div>

        </div>
        <div>
          Location
        </div>
        </div>
        <div>

        </div>
  
</div>
<div className="flex"> </div>
</div>
        </div>
        <div className="mt-48">

        <AboutusPage/>
        </div>
      </div> 
     

)
};

export default LandingPage; 
    