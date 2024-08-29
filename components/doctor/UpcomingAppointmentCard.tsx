import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface UpcomingAppointmentCardProps {
  className?: string;
}

const UpcomingAppointmentCard = ({
  className,
}: UpcomingAppointmentCardProps) => {
  return (
    <Card>
      <CardContent className={cn("", className)}>
        <div className="w-full bg-[#f5f8ff] rounded-lg space-y-4 p-4">
          {/* name gender age location */}
          <div className="flex items-center gap-2">
            <Image
              src={`https://randomuser.me/api/portraits/men/${Math.floor(
                Math.random() * 100
              )}.jpg`}
              alt="doctor"
              width={50}
              height={50}
              className="rounded-lg"
            />

            <div className="flex flex-col gap-1">
              <h2 className="text-primary text-sm font-semibold flex items-center gap-1">
                Charles Robbie{" "}
                <Image
                  src={"/assets/icons/GenderMale.svg"}
                  alt="male"
                  width={16}
                  height={16}
                />
              </h2>

              <div className="flex items-center gap-2 justify-between">
                <p className="text-sm font-semibold">25 years old</p>

                <Separator
                  orientation="vertical"
                  className="h-4 w-px bg-[#e2e8f0]"
                />

                <div className="flex gap-1">
                  <MapPin className="w-4 h-4" />
                  <p className="text-xs font-normal leading-tight">
                    New York, USA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* blood group height weight */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-start flex-col gap-1">
              <p className="text-xs font-normal">Blood</p>
              <span className="text-base font-bold">O+</span>
            </div>

            <Separator
              orientation="vertical"
              className="h-10 w-px bg-[#e2e8f0]"
            />

            <div className="flex items-start flex-col gap-1">
              <p className="text-xs font-normal">Height</p>
              <span className="text-base font-bold">186cm</span>
            </div>

            <Separator
              orientation="vertical"
              className="h-10 w-px bg-[#e2e8f0]"
            />

            <div className="flex items-start flex-col gap-1">
              <p className="text-xs font-normal">Weight</p>
              <span className="text-base font-bold">90kg</span>
            </div>
          </div>

          {/* Speciality consultation type */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start flex-col gap-1">
              <p className="text-xs font-normal">Speciality</p>
              <span className="text-base font-bold">Dermatologist</span>
            </div>

            <div className="flex items-start flex-col gap-1">
              <p className="text-xs font-normal">Consultation Type</p>
              <span className="text-base font-bold">Acne Treatment</span>
            </div>
          </div>

          {/* sheduledDate */}
          <div className="space-y-2">
            <p className="text-xs font-normal">Appointment Date & Time:</p>

            <div className="flex items-center justify-between gap-5">
              <div className="flex items-start flex-col gap-1">
                <p className="text-xs font-normal">Speciality</p>
                <span className="text-base font-bold">Dermatologist</span>
              </div>

              <Separator
                orientation="vertical"
                className="h-4 w-px bg-[#e2e8f0]"
              />

              <div className="flex items-start flex-col gap-1">
                <p className="text-xs font-normal">Consultation Type</p>
                <span className="text-base font-bold">Acne Treatment</span>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-2">
            <p className="text-xs font-normal">Allergies:</p>

            <div className="flex gap-2">
              <div className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5">
                Aspirin Allergy
              </div>
              <div className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5">
                Antibiotic Allergy
              </div>
            </div>
          </div>

          {/* message and join now */}
          <div className="flex items-center justify-between gap-3">
            <Button className="w-full" variant={"outline"}>
              Message
            </Button>
            <Button className="w-full">Join Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentCard;
