"use client";

import { useFormContext } from "react-hook-form";
import { CardDescription, CardTitle } from "../ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const EnterOtpForm = ({ destination = "" }: { destination?: string }) => {
  const { control } = useFormContext();
  const email = control?._fields?.email?._f?.value;
  console.log("🚀 ~ EnterOtpForm ~ email:", email);

  const { resendConfirmationCode } = useAuth();

  return (
    <>
      <CardTitle className="text-2xl font-bold text-center">
        Enter OTP
      </CardTitle>

      <div className="space-y-2">
        <h1 className="text-xl font-medium">Email Verification</h1>

        <CardDescription>
          Please enter the 6 digit OTP code sent to{" "}
          <strong>{destination}</strong>
        </CardDescription>
      </div>

      {/* OTP */}
      <CustomFormField
        fieldType={FormFieldType.INPUT_OTP}
        control={control}
        name="confirmationCode"
      />

      <CardDescription className="self-end">
        <Button
          className="font-semibold text-primary hover:text-primary/80"
          variant={"link"}
          onClick={() => resendConfirmationCode(email)}
        >
          Resend OTP?
        </Button>
      </CardDescription>
    </>
  );
};

export default EnterOtpForm;
