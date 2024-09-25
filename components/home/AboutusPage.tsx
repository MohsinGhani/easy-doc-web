import React from 'react'
import Image from "next/image";
import { Button, buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';

const AboutusPage = () => {
  return (
    <div className='  w-full flex justify-center h-screen pt-24'>
      <div className=' w-[90%] md:flex justify-between '>

        <div className=' pt-12 '>
          <div className='text-[#4D77FE] font-poppins text-[18px] font-medium leading-[27px] '>
            ABOUT US
          </div>
          <div className='text-[#121212] mt-5 font-outfit text-2xl md:text-[32px] font-semibold leading-[40px] tracking-[0.015em]   w-[86%] '>
            Find the right doctor according
            to your complaint
          </div>
          <div className='text-[#5C5C5B] mt-8 text-Outfit text-[16px] font-Outfit leading-[20px] tracking-[0.02em] text-left'>
            EasyDoc is a free, health app that goes beyond matching you with <br /> doctors. It actively helps you find the right doctor based on your medical <br /> and personal needs
            and connects you with your EasyDoc community for <br /> ongoing support throughout your journey to healthier living.

          </div>
          <div className='mt-8 '>
            <div className='flex gap-3 items-start md:items-center text-center ml-[-12px] '>  <img
              src={"/assets/icons/blue-circle.svg"}
              width="20px"
              height="20px"
              alt="man-image"
            /> <h2 className='text-base font-semibold '>100% free app designed to help you find the right doctor for you. </h2></div>
          </div>
          <div className='flex mt-5 gap-3 items-start md:items-center text-center ml-[-12px] '>  <img
            src={"/assets/icons/blue-circle.svg"}
            width="20px"
            height="20px"
            alt="man-image"
          /> <h2 className='text-base font-semibold '>Available 900 doctors specialist. </h2></div>
          <Button  className={cn(
                  buttonVariants({ variant: "outline", size: "xl" }),
                  "rounded-full text-primary border-primary font-bold mt-8 px-8"
                )}>
          Learn more
        </Button>
        </div>

        <div>
          <img
            src={"/assets/images/aboutpageimg.png"}
            width="100%"
            height="100%"
            alt="man-image"
          />
        </div>
      </div>
        


    </div>
  )
}

export default AboutusPage;