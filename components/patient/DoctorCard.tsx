"use client";

import { CardContent } from "@/components/ui/card";
import { Award, Heart, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Crown } from "../icons";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import React from "react";
import FavouriteButton from "./FavouriteButton";

interface DoctorCardProps {
  doctor: User;
  isBookingCard?: boolean;
}

const DoctorCard = ({ doctor, isBookingCard = false }: DoctorCardProps) => {
  if (!doctor) return null;
  return (
    <CardContent className="rounded-lg shadow-md overflow-hidden sm:p-4 p-0 flex flex-col gap-4 max-w-sm">
      <div className="relative grow">
        <div className="w-full min-h-56 rounded-lg p-2">
          <Image
            src={doctor.picture}
            alt={doctor.display_name}
            width={300}
            height={300}
            className="w-full h-full object-cover bg-no-repeat rounded-lg"
          />
        </div>
        <div className="absolute top-2 left-0 right-0 overflow-hidden w-full flex items-center justify-between px-5 py-2">
          <div className="bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" />
            {doctor.overallRating}/5
          </div>

          <FavouriteButton doctorId={doctor.userId} />
        </div>
      </div>
      <div className="sm:p-0 p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg capitalize font-semibold flex items-center gap-2">
              {doctor.display_name.toLowerCase()} <Crown className="w-4 h-4" />
            </h2>
            <p className="text-sm text-primary capitalize">
              {doctor.designation.toLowerCase()}
            </p>
          </div>
          {doctor.available && (
            <div className="px-2 py-1 bg-green-50 rounded">
              <span className="text-green-500 text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                Available
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-600 mb-1">
            {doctor.years_of_experience.toString().padStart(2, "0")} years
            experience
          </p>

          <Separator
            orientation="vertical"
            className="w-[1px] h-[14px] bg-secondary"
          />

          <p className="text-sm text-gray-600">{doctor.location}</p>
        </div>
        {isBookingCard ? (
          <>
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                Known Languages
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {doctor.languages.map((language) => (
                  <Badge
                    key={language}
                    className="flex items-center gap-2 capitalize flex-wrap"
                    variant={"default"}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center sm:justify-center justify-between sm:w-fit w-full  gap-6 mb-4 md:mb-0">
              <div className="mr-4">
                <p className="text-sm text-muted-foreground">
                  Satisfied Patients
                </p>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-1 text-blue-400" />
                  <p className="lg:text-base text-sm font-bold sm:font-semibold">
                    200+
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Awards</p>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-1 text-green-400" />
                  <p className="lg:text-base text-sm font-bold sm:font-semibold">
                    {doctor?.awards?.length}+
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-between items-center gap-4 w-full">
            <Link
              href={`/doctors/${doctor.userId}`}
              className={cn("flex-1", buttonVariants({ variant: "outline" }))}
            >
              View details
            </Link>

            <Link
              href={`/doctors/${doctor.userId}/book-appointment`}
              className={cn(
                "relative flex-1",
                buttonVariants({ variant: "default" }), // You can customize your button style here
                "group w-full" // Ensures the button fills its container and sets the group for hover effects
              )}
            >
              {/* Default state - Price or checkmark */}
              <span className="absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                {/* Fee: e.g $400 */}
                Fee: ${doctor.average_fee.toFixed(0)}
              </span>

              {/* Hover state - Book Now */}
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white bg-black rounded-md">
                Book Now
              </span>
            </Link>
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default DoctorCard;
