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

const checkGeneralDetailsCompletion = (user: User) => {
  return (
    !!user.email &&
    !!user.given_name &&
    !!user.family_name &&
    !!user.years_of_experience &&
    !!user.city &&
    !!user.country &&
    !!user.display_name &&
    !!user.phone_number &&
    !!user.picture &&
    !!user.designation &&
    !!user.bio &&
    !!user.dob &&
    !!user.gender &&
    !!user.languages
  );
};

const profileFields: ProfileField[] = [
  { label: "General Details", completed: false, link: "/settings" },
  { label: "Availability", completed: false, link: "/settings" },
  { label: "Payment methods", completed: false, link: "/payout-settings" },
  {
    label: "Services",
    completed: false,
    link: "/specialities-and-services",
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
      case "General Details":
        field.completed = checkGeneralDetailsCompletion(user);
        break;
      case "Payment methods":
        field.completed = user.stripe_account_active;
        break;
      case "Availability":
        field.completed = user.available !== undefined && user.available;
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
              <Link
                key={field.label}
                href={field.link}
                className="flex justify-between items-center p-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <>
                    {field.completed ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-500" />
                    )}
                    <span>{field.label}</span>
                  </>
                </div>
                {field.completed ? (
                  <span className="text-green-500">Completed</span>
                ) : (
                  <span className="text-red-500">Incomplete</span>
                )}
              </Link>
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
