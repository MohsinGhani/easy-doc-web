import * as React from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export enum FormFieldType {
  INPUT = "input",
  INPUT_OTP = "otp",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  ROLE_SELECT = "role",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.INPUT_OTP:
      return (
        <FormControl>
          <InputOTP maxLength={6} {...field}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSeparator />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSeparator />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSeparator />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSeparator />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSeparator />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
      );

    case FormFieldType.EMAIL:
      return (
        <FormControl>
          <Input placeholder={props.placeholder} {...field} type="email" />
        </FormControl>
      );

    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <PasswordInput placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <Input type={"tel"} placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input
            placeholder={props.placeholder}
            type="number"
            {...field}
            id="myNumberInput"
          />
        </FormControl>
      );

    case FormFieldType.ROLE_SELECT:
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="w-full flex gap-6"
          >
            <FormItem className="flex items-center gap-6 min-h-72 relative w-1/2">
              <FormLabel className="flex items-center justify-center min-h-72 border border-border rounded-lg p-3 cursor-pointer w-full">
                <div className="flex items-center justify-center flex-col gap-6">
                  <Image
                    src={"/assets/images/patient-role.png"}
                    alt={"role"}
                    width={166}
                    height={128}
                  />

                  <p className="text-lg font-bold ">Patient</p>
                </div>

                <FormControl className="absolute right-3 top-3">
                  <RadioGroupItem value="patient" />
                </FormControl>
              </FormLabel>
            </FormItem>

            <FormItem className="flex items-center gap-6 min-h-72 relative w-1/2">
              <FormLabel className="flex items-center justify-center min-h-72 border border-border rounded-lg p-3 cursor-pointer w-full">
                <div className="flex items-center justify-center flex-col gap-6">
                  <Image
                    src={"/assets/images/doctor-role.png"}
                    alt={"role"}
                    width={166}
                    height={128}
                  />

                  <p className="text-lg font-bold ">Doctor</p>
                </div>

                <FormControl className="absolute right-3 top-3">
                  <RadioGroupItem value="doctor" />
                </FormControl>
              </FormLabel>
            </FormItem>
          </RadioGroup>
        </FormControl>
      );

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 w-full">
          {props.fieldType !== FormFieldType.CHECKBOX &&
            props.fieldType !== FormFieldType.ROLE_SELECT &&
            label && (
              <FormLabel className="text-muted-foreground">{label}</FormLabel>
            )}
          <RenderInput field={field} props={props} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
