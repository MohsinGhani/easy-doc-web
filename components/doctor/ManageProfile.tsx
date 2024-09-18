"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import { Loader } from "../common/Loader";  
import { authThunks } from "@/lib/features/auth/authThunks";
import { COUNTRIES, LANGUAGES } from "@/constants";
import { getCitiesByCountry } from "@/lib/server-only";
import { userSchema, userSchemaType } from "@/models/validationSchemas";
import { Form } from "../ui/form";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";

const ManageProfile = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const form = useForm<userSchemaType>({
    resolver: zodResolver(userSchema),
  });
   
  const {
    handleSubmit,
    setValue,  
    getValues,
    control,
    formState: { dirtyFields, errors },
  } = form;
  console.log("🚀 ~ ManageProfile ~ errors:", errors);

  const [cities, setCities] = useState<City[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer | null>(
    null
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const country = getValues("country");

  useEffect(() => {
    if (country) {
      const newFilteredStates = STATES.filter(
        (state) => state.country_code === country
      );
      setFilteredStates(newFilteredStates);
    } else {
      setFilteredStates([]);
    }
  }, [country]);

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 4 * 1024 * 1024) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));

      // Convert the file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Image must be less than 4MB.");
    }
  };

  const onSubmit = async (data: userSchemaType) => {
    const updateExpression: Record<string, any> = {};

    Object.keys(dirtyFields).forEach((field) => {
      const value = data[field as keyof userSchemaType];
      updateExpression[field] = Array.isArray(value)
        ? { value, replace: true }
        : value;
    });

    if (selectedImage) {
      if (!base64Image) {
        toast.error("Image not ready for upload.");
        return;
      }

      updateExpression.picture = {
        image: (base64Image as string).split(",")[1],
        fileName: selectedImage.name,
        mimeType: selectedImage.type,
      };
    }

    const parsedData = userSchema.safeParse(updateExpression);
    console.log("🚀 ~ onSubmit ~ parsedData:", parsedData);
    // if (!parsedData.success) {
    //   toast.error("Please fix the validation errors.");
    //   return;
    // }

    const res = await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: updateExpression,
      })
    );

    if (res.type.includes("rejected")) {
      return;
    }

    setSelectedImage(null);
    setBase64Image("");
    setImagePreviewUrl("");
  };

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);

  useEffect(() => {
    if (country) {
      getCitiesByCountry(country).then((cities: City[]) => {
        setCities(cities);
        setValue("city", user?.city || cities[0]?.name || "");
      });
    } else {
      setValue("city", user?.city || "");
    }
  }, [setValue, country, user]);

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>This will be shared on our platform</CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="flex sm:flex-row flex-col items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0 w-full text-center sm:text-left">
            <div
              className="min-w-28 w-full max-w-28 h-28 border-2 bg-neutral-50 rounded-2xl border-dashed border-neutral-400 sm:flex items-center justify-center"
              onClick={handleImageUploadClick}
            >
              {imagePreviewUrl ? (
                <Image
                  src={imagePreviewUrl}
                  width={100}
                  height={100}
                  alt="Profile Picture"
                  className="w-full h-full object-contain rounded-2xl"
                />
              ) : (
                <Image
                  src={user?.picture || ""}
                  width={100}
                  height={100}
                  alt="Profile Picture"
                  className="w-full h-full object-contain rounded-2xl"
                />
              )}
            </div>

            <div className="flex flex-col items-center sm:items-start justify-between gap-5 w-full">
              <div className="space-y-1.5">
                <CardTitle>Upload Profile Picture</CardTitle>
                <CardDescription>
                  Your image should be below 4 MB. Accepted formats: jpg, png,
                  svg.
                </CardDescription>
              </div>
              <Button
                className="w-full sm:w-auto"
                onClick={handleImageUploadClick}
              >
                Upload Image
              </Button>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>This will be shared on our platform</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* display_name */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name="family_name"
                  label="Display Name"
                  placeholder="Enter your display name"
                />

                {/* dob */}
                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={control}
                  name={`dob`}
                  label="Date of Birth"
                />

                {/* gender */}
                <CustomFormField
                  fieldType={FormFieldType.GENDER_SELECT}
                  control={control}
                  name={`gender`}
                  label="Gender"
                />

                {/* designation */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name="designation"
                  label="Designation"
                  placeholder="Enter your designation"
                />

                {/* email */}
                <CustomFormField
                  fieldType={FormFieldType.EMAIL}
                  control={control}
                  name="email"
                  label="Email Address"
                  placeholder="Enter email address"
                  disabled
                />

                {/* phone_number */}
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={control}
                  name="phone_number"
                  label="Contact no"
                  placeholder="Enter a phone number"
                />

                {/* country */}
                <CustomFormField
                  fieldType={FormFieldType.SELECT_WITH_SEARCH}
                  control={control}
                  items={COUNTRIES.map((c) => ({
                    label: `${c.flag} ${c.name}`,
                    value: c.code,
                  }))}
                  name={`country`}
                  label="Country"
                  placeholder={"Select country..."}
                />

                {/* city */}
                <CustomFormField
                  fieldType={FormFieldType.SELECT_WITH_SEARCH}
                  control={control}
                  items={cities.map((c) => ({
                    label: `${c.name} - ${c.admin1}`,
                    value: c.id,
                  }))}
                  name={`city`}
                  label="City"
                  placeholder={"Select city..."}
                />

                {/* languages */}
                <CustomFormField
                  fieldType={FormFieldType.MULTI_SELECT_WITH_SEARCH}
                  control={control}
                  items={LANGUAGES.map((item) => ({
                    label: item.name,
                    value: item.name,
                  }))}
                  name={`languages`}
                  label="Known Languages"
                  placeholder={"Select languages..."}
                />

                {/* bio */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name="bio"
                  label="Bio"
                  placeholder="Enter your bio"
                />
              </div>

              <CardFooter className="flex justify-end space-x-2">
                <Button variant="ghost" type="reset">
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageProfile;
