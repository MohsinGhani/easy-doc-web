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
import { SelectWithSearch } from "@/components/SelectWithSearch";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { format } from "date-fns";
import YearPicker from "../ui/year-picker";
import { PhoneInput } from "../ui/phone-input";
import { CountryCode } from "libphonenumber-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum FormFieldType {
  INPUT = "input",
  INPUT_OTP = "otp",
  EMAIL = "email",
  PASSWORD = "password",
  NUMBER = "number",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  ROLE_SELECT = "role",
  COMBOBOX = "combobox",
  SELECT = "select",
  SELECT_WITH_SEARCH = "select_with_search",
  MULTI_SELECT_WITH_SEARCH = "multi_select_with_search",
  TEXTAREA = "textarea",
  AUTO_RESIZE_TEXTAREA = "textarea",
  DATE_PICKER = "date-picker",
  YEAR_PICKER = "year-picker",
  GENDER_SELECT = "gender_select",
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
  items?: { value: string; label: string }[];
  fieldType: FormFieldType;
  defaultValue?: string;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  console.log("🚀 ~ RenderInput ~ field:", field.value);
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input
            placeholder={props.placeholder}
            disabled={props.disabled}
            name={props.name}
            {...field}
          />
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
          <Input
            name={props.name}
            placeholder={props.placeholder}
            type="email"
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.PASSWORD:
      return (
        <FormControl>
          <PasswordInput
            name={props.name}
            placeholder={props.placeholder}
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            name={props.name}
            placeholder={props.placeholder}
            disabled={props.disabled}
            defaultCountry={props.defaultValue as CountryCode}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input
            name={props.name}
            placeholder={props.placeholder}
            type="number"
            id="myNumberInput"
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox
              name={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              id={props.name}
              disabled={props.disabled}
            />
            <label
              htmlFor={props.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {props.label}
            </label>
          </div>
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

    case FormFieldType.SELECT_WITH_SEARCH:
      return (
        <FormControl>
          <SelectWithSearch
            items={props.items || []}
            defaultValue={field.value || []}
            onChange={field.onChange}
            className="w-full"
          />
        </FormControl>
      );

    case FormFieldType.MULTI_SELECT_WITH_SEARCH:
      return (
        <>
          <FormControl>
            <MultipleSelector
              name={props.name}
              {...field}
              onChange={(options) => {
                console.log("🚀 ~ RenderInput ~ options:", options);
                return field.onChange(options.map((option) => option.value));
              }}
              value={(() => {
                if (!field.value) {
                  // Handle undefined or null case by returning an empty array
                  return [];
                }

                if (Array.isArray(field.value)) {
                  // Check if the array contains objects or strings
                  if (typeof field.value[0] === "object") {
                    // Return the array of objects as is
                    return field.value;
                  }

                  if (typeof field.value[0] === "string") {
                    // Map the array of strings to objects with value and label
                    return field.value.map((v: string) => ({
                      value: v,
                      label: v.charAt(0).toUpperCase() + v.slice(1),
                    }));
                  }
                }

                if (typeof field.value === "string") {
                  // Map the string to an object with value and label
                  return [{ value: field.value, label: field.value }];
                }

                return [];
              })()}
              selectFirstItem={false}
              defaultOptions={(props.items as Option[]) || []}
              hidePlaceholderWhenSelected
              creatable
              maxSelected={5}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no languages found.
                </p>
              }
              disabled={props.disabled}
            />
          </FormControl>
        </>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            name={props.name}
            placeholder={props.placeholder}
            className="w-full"
            rows={5}
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.AUTO_RESIZE_TEXTAREA:
      return (
        <FormControl>
          <AutosizeTextarea
            name={props.name}
            placeholder={props.placeholder}
            rows={5}
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <FormControl>
          <DateTimePicker
            value={
              !field.value
                ? new Date()
                : field.value === "Present"
                ? new Date()
                : new Date(field.value)
            }
            onChange={(value) =>
              field.onChange(format(value as Date, "yyyy/MM/dd"))
            }
            granularity={"day"}
            displayFormat={{ hour24: "yyyy/MM/dd" }}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.YEAR_PICKER:
      return (
        <FormControl>
          <YearPicker
            value={field.value}
            onChange={field.onChange}
            fromYear={new Date().getFullYear() - 70}
            toYear={new Date().getFullYear()}
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.GENDER_SELECT:
      return (
        <FormControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ? field.value : "male"}
            // defaultValue={"male"}
          >
            <SelectTrigger name={props.name}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="N/D">N/D</SelectItem>
            </SelectContent>
          </Select>
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
