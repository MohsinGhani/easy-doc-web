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

const LandingPage = () => {
  return (
    <div className="relative h-screen">
      {/* Left corner image */}
      <div className="absolute top-0 left-0">
        <Image
          src={"/assets/images/landingpage-bg.png"}
          width={300}
          height={200}
          alt="landingpage-bg"
        />
      </div>

      {/* Right corner image */}
      <div className="absolute top-0 right-0">
        <Image
          src={"/assets/images/landingpagecircle-bg.png"}
          width={500}
          height={400}
          alt="landingpagecircle-bg"
        />
      </div>

      {/* Center bottom image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <Image
          src={"/assets/images/landingpagellipse-bg.png"}
          width={1000}
          height={600}
          alt="landingpagebottom-bg"
        />
        
        {/* Large overlay man image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[65%]">
          <Image
            src={"/assets/images/landingpagemain-img.png"} // Replace with the correct path to your "man" image
            width={1000} // Larger width
            height={900} // Larger height
            alt="man-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;



