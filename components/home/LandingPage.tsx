// import React from "react";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import { Navbar } from "../navbar/Navbar";

// const LandingPage = () => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="w-full mx-auto flex justify-between h-full gap-5 px-12">
//         <div className="space-y-7 flex flex-col text-center items-center justify-center h-[400px] mx-auto mt-20">
//           <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//             Welcome to <span className="text-blue-500">Doctory</span>
//           </h1>
//           <p className="max-w-md text-xl mx-auto">
//             A medical <u className="border-b border-blue-500">appointment</u>{" "}
//             scheduling platform <br /> for{" "}
//             <span className="text-blue-500">patients</span> and{" "}
//             <span className="text-blue-500">doctors</span>
//           </p>

//           <div className="flex items-center gap-4 w-fit max-w-md mx-auto">
//             <Link href={`/auth/sign-up`} className="font-bold">
//               <Button size={"lg"}>Join Now!</Button>
//             </Link>
//             <span className="text-sm text-muted-foreground">OR</span>
//             <Link href={`/auth/sign-up?role=doctor`} className="font-bold">
//               <Button size={"lg"} variant={"secondary"}>
//                 Join as a Doctor..
//               </Button>
//             </Link>
//           </div>
//         </div>
//         <Image
//           src={"/sign-up-img.png"}
//           width={500}
//           height={1000}
//           alt="sign up image"
//         />
//       </div>
//     </>
//   );
// };

// export default LandingPage;
import React from "react";
import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import AboutusPage from "./AboutusPage";
// import AboutusPage from "./AboutusPage";

const LandingPage = () => {
  return (
    <>
    <div className="absolute top-0 left-0 w-full  h-screen">
  <div className="flex justify-between">
    <div className="relative z-50 w-80 left-40 hidden md:block">
      <Image
        className="w-[100%]"
        src={"/assets/images/landingpage-bg.png"}
        width={300}
        height={200}
        alt="landingpage-bg"
      />
    </div>
    <div className="absolute top-0 right-0 z-50">
      <Image
        src={"/assets/images/landingpagecircle-bg.png"}
        width={500}
        height={400}
        alt="landingpagecircle-bg"
      />
    </div>
  </div>

  {/* Pink border div positioned grid jusabove images */}
  <div className="absolute top-10 md:top-32 left-1/2 z-50 transform -translate-x-1/2 flex flex-col md:flex-row justify-between w-[90%] md:w-[80%] p-4 ">
  <div className="md:w-1/2 w-full ">
    <div className="text-[#121212] font-[Outfit] text-[24px] md:text-[54px] font-bold leading-[48px] md:leading-[68.04px] tracking-[0.02em] text-left">
      Medical Care Now <br/>
      Simplified For <br/> 
      <span className="text-[#4D77FF]">Everyone</span>
    </div>

    <div className="font-[Outfit] text-[14px] md:text-[16px] font-normal leading-[28px] md:leading-[36px] text-left text-[#5C5C5B] mt-4">
      <p>You Only Have To Know One Thing That You Can <br/> Learn Anything Anywhere To Do You Discover<br/> Yourself.</p>
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

  <div className="md:w-96 w-full mt-10 md:mr-12">
    <div className="w-5 md:w-10 mx-auto mr-96">
      <Image 
        className="w-full" 
        src="/assets/images/landingpageimg.svg" 
        width={300} 
        height={200} 
        alt="landingpage-bg" 
      />
    </div>

    <div className="font-[Outfit] text-[16px] md:text-[18px] font-normal leading-[24px] md:leading-[29px] pt-4 text-left text-[#5C5C5B]">
      <p>You only have to know one thing that you can <br/> learn anything anywhere to do you discover<br/> yourself.</p>
    </div>

    <div className="flex mt-3">
      <div className="border-t-2 mt-3 border-[#140F07] w-10"></div>
      <div className="pl-2 font-[Outfit] text-[#140F07] font-bold text-[14px] md:text-[16px]">Robert Mathew</div>
    </div>
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
 

<div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 -translate-y-1 z-50 w-[56%] hidden md:block">
  <Image
    src={"/assets/images/landingpagemain-img.png"}
    width={1100} 
    height={900} 
    alt="man-image"
  />
</div>

</div>

  
    {/* <AboutusPage/> */}
    </>
  );
};

export default LandingPage;