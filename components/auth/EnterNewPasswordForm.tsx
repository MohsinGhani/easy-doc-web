"use client";

import { useFormContext } from "react-hook-form";
import { CardDescription } from "../ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const EnterNewPasswordForm = () => {
  const { control } = useFormContext();
  const email = control?._fields?.email?._f?.value;

  const { resendConfirmationCode } = useAuth();

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl font-medium">Reset Password</h1>

        <CardDescription>
          Please enter the 6 digit OTP code sent to <strong>{email}</strong>
        </CardDescription>
      </div>

      {/* OTP */}
      <CustomFormField
        fieldType={FormFieldType.INPUT_OTP}
        control={control}
        name="confirmationCode"
      />

      {/* Password */}
      <CustomFormField
        fieldType={FormFieldType.PASSWORD}
        control={control}
        name="newPassword"
        label="New Password"
      />

      {/* Confirm Password */}
      <CustomFormField
        fieldType={FormFieldType.PASSWORD}
        control={control}
        name="confirmPassword"
        label="Confirm New Password"
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

export default EnterNewPasswordForm;
