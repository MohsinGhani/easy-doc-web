import React from 'react';
import Image from 'next/image';
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const BecomeDoctorTemplate = () => {
  return (
    <div className="w-full h-full px-4 md:px-8 lg:px-16">
      <div className="w-full lg:w-[90%] rounded-3xl md:h-96 h-full bg-primary flex flex-col lg:flex-row justify-around items-center lg:items-start py-10">
        <div className="w-[90%] lg:w-[40%] pl-4 lg:pl-8">
          <div className="pt-8 lg:pt-14">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-8 h-1 bg-white"></div>
              <h1 className="pl-3 text-white text-sm md:text-base lg:text-lg">BECOME A DOCTOR</h1>
            </div>
            <h1 className="text-white text-center lg:text-left leading-[35px] md:leading-[45px] text-[20px] md:text-[30px] font-semibold mt-4">
              Explore Our Network of 50+ <br /> Certified Doctors & Specialists
            </h1>
            <div className="flex justify-center lg:justify-start">
              <Button
                className={cn( 
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "rounded-full text-white border-white bg-transparent font-bold mt-8 px-8"
                )}
              >
                Become a doctor 
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-[90%] lg:w-[50%] h-[300] lg:h-[400px] mt-10 lg:mt-0 hidden md:block ">
          <Image
            src="/assets/images/Doctors.png"
            width={600}
            height={600}
            alt="Doctors-img"
            className="absolute top-0 left-1/2 transform -translate-x-1/2 lg:-top-16 lg:left-[55%]"
          />
        </div>
      </div>
    </div>
  );
};

export default BecomeDoctorTemplate;
