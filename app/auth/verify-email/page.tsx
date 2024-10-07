import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Verify Email",
  description: "Verify your email to complete the registration process",
};

export default function VerifyEmailPage() {
  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-72px)]">
      <div className="hidden lg:block fixed left-0 top-[72px] w-1/2 h-[calc(100vh-72px)] bg-[url(/assets/images/register-img.png)] bg-left bg-contain bg-no-repeat" />
      <div className="lg:w-1/2 lg:ml-auto w-full flex items-center justify-center lg:px-1 sm:px-10 px-4 my-[32px]">
        <VerifyEmailForm />
      </div>
    </div>
  );
}
