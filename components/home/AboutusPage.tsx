
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { BlueCircle } from "../icons";

const AboutusPage = () => {
  return (
    <div className="w-full flex justify-center items-center h-full lg:mt-72 ">
      <div className="w-[90%] lg:flex justify-between gap-6">
        <div className=" pt-12 ">
          <div className="text-primary text-[18px] font-medium leading-[27px] ">
            ABOUT US
          </div>
          <div className="text-[#121212] mt-5 text-2xl md:text-[32px] font-semibold leading-[40px] tracking-[0.015em]   w-[86%] ">
            Find the right doctor according to your complaint
          </div>
          <div className="text-[#5C5C5B] mt-8 text-[16px] leading-[20px] tracking-[0.02em] text-left">
            EasyDoc is a free, health app that goes beyond matching you with{" "}
            <br /> doctors. It actively helps you find the right doctor based on
            your medical <br /> and personal needs and connects you with your
            EasyDoc community for <br /> ongoing support throughout your journey
            to healthier living.
          </div>
          <div className="mt-8 ">
            <div className="flex gap-3 items-start md:items-center text-center ml-[-12px] ">
              <BlueCircle />
              <h2 className="text-base font-semibold">
                100% free app designed to help you find the right doctor for
                you.
              </h2>
            </div>
          </div>
          <div className="flex mt-5 gap-3 items-start md:items-center text-center ml-[-12px] ">
            <BlueCircle />
            <h2 className="text-base font-semibold ">
              Available 900 doctors specialist.{" "}
            </h2>
          </div>
          <Button
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "rounded-full text-primary border-primary font-bold mt-8 px-8"
            )}
          >
            Learn more
          </Button>
        </div>

        <div>
        <Image
    src="/assets/images/aboutpageimg.png"
    width={1000}  
    height={1000} 
    alt="man-image"
    className="object-cover w-full h-auto" 
/>

        </div>
      </div>
    </div>
  );
};

export default AboutusPage;