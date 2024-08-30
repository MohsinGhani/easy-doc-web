"use client";

import { useFormContext } from "react-hook-form";
import { CardTitle } from "../ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";

const PersonalDetailsForm = () => {
  const { control } = useFormContext();
  const role = control?._fields?.role?._f?.value;
  return (
    <>
      <CardTitle>
        <h1 className="text-2xl font-bold text-center">
          Enter Personal Details
        </h1>
      </CardTitle>

      <div className="flex flex-col justify-center sm:flex-row gap-6 sm:items-start">
        {/* given_name */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="given_name"
          label="First Name"
          placeholder="Enter first name"
        />

        {/* family_name */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="family_name"
          label="Last Name"
          placeholder="Enter last name"
        />
      </div>

      {/* licence */}
      {role === "doctor" && (
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          name="licence"
          label="Medical License No:"
          placeholder="Enter your license no "
        />
      )}

      {/* EMAIL */}
      <CustomFormField
        fieldType={FormFieldType.EMAIL}
        control={control}
        name="email"
        label="Email Address*"
        placeholder="Enter email address"
        />

      {/* Password */}
      <CustomFormField
        fieldType={FormFieldType.PASSWORD}
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password*"
      />

      {/* Confirm Password */}
      <CustomFormField
        fieldType={FormFieldType.PASSWORD}
        control={control}
        name="confirmPassword"
        label="Confirm Password*"
        placeholder="Confirm your password"
      />
    </>
  );
};

export default PersonalDetailsForm;
