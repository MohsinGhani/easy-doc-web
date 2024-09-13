"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import { SelectWithSearch } from "../SelectWithSearch";
import { MultiSelectWithSearch } from "../MultiSelectWithSearch";
import { Loader } from "../Loader";
import { authThunks } from "@/lib/features/auth/authThunks";
import { COUNTRIES, LANGUAGES, STATES } from "@/constants";
import { DateTimePicker } from "../ui/datetime-picker";
import { format } from "date-fns";
import { PhoneInput } from "../ui/phone-input";
import { countryCodeToName, countryNameToCode } from "@/lib/utils";

const ManageProfile = () => {
  const [country, setCountry] = useState("");
  const [filteredStates, setFilteredStates] = useState<StateProps[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | ArrayBuffer | null>(
    null
  );
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateExpression, setUpdateExpression] = useState<Record<string, any>>(
    {}
  );
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useForm<User>({
    defaultValues: {
      given_name: "",
      family_name: "",
      display_name: "",
      dob: "",
      designation: "",
      email: "",
      phone_number: "",
      country: "",
      city: "",
      languages: [],
      bio: "",
    },
  });

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

      // Convert the file to
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Image must be less than 4MB.");
    }
  };

  const handleChange = (name: string, value: any) => {
    setUpdateExpression((prev) => ({
      ...prev,
      [name]: Array.isArray(value) ? { value, replace: true } : value,
    }));
  };

  const onSubmit = async (data: User) => {
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
      setValue("picture", user.picture || "");
      setValue("given_name", user.given_name || "");
      setValue("family_name", user.family_name || "");
      setValue("display_name", user.display_name || "");
      setValue("dob", user.dob || "");
      setValue("gender", user.gender || "");
      setValue("designation", user.designation || "");
      setValue("email", user.email || "");
      setValue("phone_number", user.phone_number || "");
      setValue("country", user.country || "");
      setValue("city", user.city || "");
      setValue("languages", user.languages || "");
      setValue("bio", user.bio || "");
    }
  }, [user, setValue]);

  if (loading) return <Loader />;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>This will be shared to our platform</CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-6">
          <div className="flex sm:flex-row flex-col items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0 w-full text-center sm:text-left">
            <div
              className="min-w-28 w-full max-w-28 h-28 border-2 bg-neutral-50 rounded-2xl border-dashed border-neutral-400 sm:flex items-center justify-center hidden"
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
                  src={user.picture || ""}
                  width={100}
                  height={100}
                  alt="Profile Picture 1"
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
          <CardDescription>This will be shared to our platform</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* given_name */}
              <div className="space-y-2">
                <Label htmlFor="given_name">First name</Label>
                <Input
                  id="given_name"
                  placeholder="Enter your first name"
                  {...register("given_name")}
                  onChange={(e) => handleChange("given_name", e.target.value)}
                />
              </div>

              {/* family_name */}
              <div className="space-y-2">
                <Label htmlFor="family_name">Last name</Label>
                <Input
                  id="family_name"
                  placeholder="Enter your last name"
                  {...register("family_name")}
                  onChange={(e) => handleChange("family_name", e.target.value)}
                />
              </div>

              {/* display_name */}
              <div className="space-y-2">
                <Label htmlFor="display_name">Display name</Label>
                <div className="flex items-center border border-input rounded-md lg:px-6 sm:px-4 px-3  py-[6px]">
                  <span className="mr-2">Dr.</span>
                  <input
                    id="display_name"
                    type="text"
                    placeholder="Enter your display name"
                    className="flex-grow bg-transparent outline-none text-sm"
                    {...register("display_name")}
                    onChange={(e) =>
                      handleChange("display_name", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* dob */}
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>

                <DateTimePicker
                  granularity="day"
                  onChange={(value) =>
                    handleChange("dob", format(value as Date, "yyyy/MM/dd"))
                  }
                  placeholder="Pick a date"
                  disabled={loading}
                  displayFormat={{ hour24: "yyyy/MM/dd" }}
                />
              </div>

              {/* gender */}
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  onValueChange={(value) => handleChange("gender", value)}
                  defaultValue={user.gender}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* designation */}
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  placeholder="Enter your designation"
                  {...register("designation")}
                  onChange={(e) => handleChange("designation", e.target.value)}
                />
              </div>

              {/* email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  {...register("email")}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled
                />
              </div>

              {/* phone_number */}
              <div className="space-y-2">
                <Label htmlFor="phone_number">Contact no</Label>
                <PhoneInput
                  id="phone_number"
                  placeholder="Enter your phone no"
                  {...register("phone_number")}
                  onChange={(value) => handleChange("phone_number", value)}
                  defaultCountry="PK"
                />
              </div>

              {/* country */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <SelectWithSearch
                  onChange={(value) => {
                    handleChange("country", value);
                    setCountry(value);
                  }}
                  defaultValue={user.country}
                  placeholder="Search country"
                  items={COUNTRIES.map((country) => ({
                    value: country.iso2,
                    label: `${country.emoji} ${country.name}`,
                  }))}
                />
              </div>

              {/* state */}
              <div className="space-y-2">
                <Label htmlFor="city">State</Label>
                <SelectWithSearch
                  onChange={(value) => handleChange("state", value)}
                  // defaultValue={user.city}
                  placeholder="Search state"
                  items={filteredStates.map((state: StateProps) => ({
                    value: state.state_code,
                    label: state.name,
                  }))}
                  // items={filteredStates.map((state) => {
                  //   console.log("🚀 ~ items={STATES.filter ~ state:", state);

                  //   return {
                  //     value: state.country_code,
                  //     label: state.name,
                  //   };
                  // })}
                />
              </div>

              {/* languages */}
              <div className="space-y-2">
                <Label htmlFor="languages">Known Languages</Label>
                <div className="">
                  <MultiSelectWithSearch
                    onSelect={(values) => handleChange("languages", values)}
                    placeholder="Select Languages"
                    items={LANGUAGES}
                    defaultValues={user.languages}
                  />
                </div>
              </div>

              {/* bio */}
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Enter Bio"
                  className="min-h-[100px]"
                  {...register("bio")}
                  onChange={(e) => handleChange("bio", e.target.value)}
                />
              </div>
            </div>

            <CardFooter className="flex justify-end space-x-2">
              <Button variant="ghost">Cancel</Button>
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageProfile;
