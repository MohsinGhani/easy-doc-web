import Image from "next/image";
import React from "react";

const DoctorsListBanner = () => {
  return (
    <div className="@container w-full h-[258px] relative flex items-center justify-center bg-[#F5F8FF] mb-[70px] mt-5">
      <div className="absolute inset-0 w-[254px] h-[204px]">
        <Image
          src={"/assets/images/doctorslistvector.svg"}
          alt="doctors-banner"
          width={254}
          height={204}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full flex-col justify-start items-center gap-2 inline-flex">
        <div className="text-center text-lg font-medium">Home / Doctors</div>
        <div className="text-primary @3xl:text-4xl font-semibold @3xl:tracking-wide text-xl">
          OUR SPECIALIST DOCTORS
        </div>
        <p className="@3xl:w-[50%] w-[80%] text-center text-zinc-600 @3xl:text-2xl @3xl:leading-loose text-base leading-normal">
          You only have to know one thing that you can learn anything anywhere
          to do you discover yourself.
        </p>
      </div>
    </div>
  );
};

export default DoctorsListBanner;
