import React from 'react';
import DoctorCard from '../patient/DoctorCard';
import doctorsData from '../../public/data/specialdoctors.json'; // Adjust the path based on your structure
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; 

const SpecialistDoctors = () => {
  return (
    <div className="h-screen w-full relative">
      <div className="pt-32 flex justify-between items-start">
        <div>
          <p className="font-poppins text-lg font-bold leading-[27px] text-primary">FEATURED PROFILE</p>
          <h1 className="font-outfit text-[36px] font-semibold leading-[45.36px] tracking-[0.02em] text-[#121212]">
            OUR SPECIALIST DOCTORS
          </h1>
          <p className="font-outfit text-[20px] font-semibold leading-[33.6px] text-[#5C5C5B]">
            You only have to know one thing that you can learn anything <br /> anywhere to do you discover yourself.
          </p>
        </div>
      </div>
      <Carousel className="w-full mt-8 relative">
        {/* Position arrows side by side above the carousel content */}
        <div className="absolute right-10 -top-24 w-2  ">
        <CarouselPrevious className="text-[#4D77FF] border border-[#4D77FF] -ml-16 text-2xl w-14 h-14 flex items-center justify-center rounded-full " />
        <CarouselNext className="text-[#4D77FF] border-[#4D77FF]  text-2xl w-14 h-14 mr-9   flex items-center justify-center rounded-full " />
        </div>
        <CarouselContent className="-ml-1 flex">
          {doctorsData.map((doctor) => (
            <CarouselItem key={doctor.userId} className="p-1 md:basis-1/4 lg:basis-1/4">
              <DoctorCard 
                doctor={doctor}
                customImage={doctor.picture}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SpecialistDoctors;