import React from 'react'
import Image from 'next/image';
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const BecomeDoctorTemplate = () => {
  return (
    <div className='w-full h-screen pl-16'>
      <div className='w-[90%] h-[50%] rounded-3xl bg-[#4D77FF] flex justify-around  '>
    <div className=' w-[40%] h-[80%] pt-28 pl-8'>
<div>
<div className="flex items-center">
  <div className="w-8 h-1 bg-[#FFFF] "></div> 
  <h1 className='pl-3 text-[#FFFF] font-outfit '>BECOME A DOCTOR</h1>
</div>
<h1 className='text-[#FFFF] font-outfit leading-[45.40px] text-[30px] font-semibold '>
    Browse our collection of 50+ <br/>  Webflow Templates</h1>
<Button
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "rounded-full text-[#FFFF] border-[#FFFF] bg-transparent font-bold mt-8 px-8"
            )}
          >
            Become a doctor 
          </Button>
</div>
</div>
<div className='relative w-[50%] h-[60%] '>
      <Image
        src="/assets/images/Docotrs.png"
        width={600}
        height={800}
        alt="Doctors-img"
        className="absolute top-[-62px] left-[55%] transform -translate-x-1/2"
      />
    </div>
     </div>
    </div>
  )
}

export default BecomeDoctorTemplate;