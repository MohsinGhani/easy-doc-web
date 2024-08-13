"use client";

import { useFormContext } from "react-hook-form";
import { CardTitle } from "../ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";

const SelectRoleForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <CardTitle>
        <h1 className="text-2xl font-bold text-center tracking-wide">
          Select Role
        </h1>
      </CardTitle>

      <CustomFormField
        fieldType={FormFieldType.ROLE_SELECT}
        control={control}
        name="role"
      />
    </>
  );
};

export default SelectRoleForm;
