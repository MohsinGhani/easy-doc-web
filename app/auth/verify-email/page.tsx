import Image from "next/image";
import VerifyEmailForm from "@/components/auth/VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <div className="@container flex items-center justify-center w-full h-full gap-[88px] py-[20px] sm:py-2">
      <div className="@6xl:block hidden w-[700px] h-[936px]">
        <Image
          src="/assets/images/register-img.png"
          alt="logo"
          width={1000}
          height={1000}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="@6xl:w-[80%] w-full flex items-center justify-center lg:px-1 sm:px-10 px-4">
        <VerifyEmailForm />
      </div>
    </div>
  );
}
