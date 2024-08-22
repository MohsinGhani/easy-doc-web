"use client";

import { useFormContext } from "react-hook-form";
import { CardDescription } from "../ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";

const EnterEmailForResetForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl font-medium">Reset Your Password</h1>

        <CardDescription>
          Enter your email and we&lsquo;ll send you a link to reset your
          password. Please check it.
        </CardDescription>
      </div>

      {/* EMAIL */}
      <CustomFormField
        fieldType={FormFieldType.EMAIL}
        control={control}
        name="email"
        label="Email Address"
        placeholder="ex: abc@example.com"
      />
    </>
  );
};

export default EnterEmailForResetForm;
