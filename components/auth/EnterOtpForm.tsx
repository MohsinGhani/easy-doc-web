"use client";

import { useFormContext } from "react-hook-form";
import { CardDescription, CardTitle } from "../ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Button } from "../ui/button";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch } from "@/lib/hooks";

const EnterOtpForm = ({ destination = "" }: { destination?: string }) => {
  const { control } = useFormContext();
  const dispatch = useAppDispatch();
  const email = control?._fields?.email?._f?.value;

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
          onClick={() =>
            dispatch(
              authThunks.resendConfirmationCode({
                values: { email },
              })
            )
          }
        >
          Resend OTP?
        </Button>
      </CardDescription>
    </>
  );
};

export default EnterOtpForm;
