import React from "react";
import { useAppSelector } from "@/lib/hooks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProfileField {
  label: string;
  completed: boolean;
  link: string;
}

const profileFields: ProfileField[] = [
  { label: "Email", completed: false, link: "/settings" },
  { label: "Given Name", completed: false, link: "/settings" },
  { label: "Family Name", completed: false, link: "/settings" },
  { label: "Display Name", completed: false, link: "/settings" },
  { label: "Phone Number", completed: false, link: "/settings" },
  {
    label: "Profile Picture",
    completed: false,
    link: "/settings",
  },
  { label: "Designation", completed: false, link: "/settings" },
  { label: "Bio", completed: false, link: "/settings" },
  {
    label: "Years of Experience",
    completed: false,
    link: "/settings",
  },
  { label: "City", completed: false, link: "/settings" },
  { label: "Country", completed: false, link: "/settings" },
  { label: "Date of Birth", completed: false, link: "/settings" },
  { label: "Gender", completed: false, link: "/settings" },
  { label: "Availability", completed: false, link: "/settings" },
  // {
  //   label: "Verification Status",
  //   completed: false,
  //   link: "/settings/verification",
  // },
  { label: "Languages", completed: false, link: "/settings" },
  {
    label: "Services",
    completed: false,
    link: "/settings/specialities-and-services",
  },
  {
    label: "Experiences",
    completed: false,
    link: "/settings?avtiveTab=experience",
  },
  { label: "Awards", completed: false, link: "/settings?avtiveTab=awards" },
  {
    label: "Education",
    completed: false,
    link: "/settings?avtiveTab=education",
  },
  { label: "Available Days", completed: false, link: "/available-timings" },
];

const CompleteProfileDialog: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  profileFields.forEach((field) => {
    switch (field.label) {
      case "Email":
        field.completed = !!user.email;
        break;
      case "Given Name":
        field.completed = !!user.given_name;
        break;
      case "Family Name":
        field.completed = !!user.family_name;
        break;
      case "Display Name":
        field.completed = !!user.display_name;
        break;
      case "Phone Number":
        field.completed = !!user.phone_number;
        break;
      case "Profile Picture":
        field.completed = !!user.picture;
        break;
      case "Designation":
        field.completed = !!user.designation;
        break;
      case "Bio":
        field.completed = !!user.bio;
        break;
      case "Years of Experience":
        field.completed = !!user.years_of_experience;
        break;
      case "City":
        field.completed = !!user.city;
        break;
      case "Country":
        field.completed = !!user.country;
        break;
      case "Date of Birth":
        field.completed = !!user.dob;
        break;
      case "Gender":
        field.completed = !!user.gender;
        break;
      case "Availability":
        field.completed = user.available !== undefined && user.available;
        break;
      // case "Verification Status":
      //   field.completed = user.verified !== undefined;
      //   break;
      case "Languages":
        field.completed = user.languages && user.languages.length > 0;
        break;
      case "Services":
        field.completed = user.services && user.services.length > 0;
        break;
      case "Experiences":
        field.completed = user.experiences && user.experiences.length > 0;
        break;
      case "Awards":
        field.completed = user.awards && user.awards.length > 0;
        break;
      case "Education":
        field.completed = user.education && user.education.length > 0;
        break;
      case "Available Days":
        field.completed =
          user.availableDays &&
          user.availableDays.some((day) => day.slots && day.slots.length > 0);
        break;
    }
  });

  return (
    <>
      <Dialog>
        <DialogTrigger
          className={cn("", buttonVariants({ variant: "default" }))}
        >
          Complete your profile
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
          </DialogHeader>

          <div className="py-4 space-y-2">
            {profileFields.map((field) => (
              <div
                key={field.label}
                className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-100"
              >
                <Link
                  href={field.link}
                  className="flex items-center space-x-2 text-sm font-medium"
                >
                  <>
                    {field.completed ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-500" />
                    )}
                    <span>{field.label}</span>
                  </>
                </Link>
                {field.completed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-red-500">Incomplete</span>
                )}
              </div>
            ))}
          </div>

          <DialogFooter>
            <DialogClose
              className={cn("", buttonVariants({ variant: "outline" }))}
            >
              Close
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompleteProfileDialog;
