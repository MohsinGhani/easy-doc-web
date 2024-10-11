"use client";

import Image from "next/image";
import { Separator } from "../ui/separator";
import { CalendarCheck2, Clock3, MapPin } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn, formatTimeForUI } from "@/lib/utils";
import { GenderMale } from "../icons";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";

interface AppointmentCardProps {
  className?: string;
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  className,
  appointment,
}) => {
  const loading = useAppSelector((state) => state.appointment.loading);
  const {
    user: { role },
    loading: Uloading,
  } = useAppSelector((state) => state.auth);

  if (loading || Uloading || !appointment) {
    return (
      <div
        className={cn(
          "w-full bg-[#f5f8ff] rounded-lg p-4 flex flex-col justify-between h-fit min-h-[200px] animate-pulse",
          className
        )}
      >
        {/* Top Section Skeleton */}
        <div className="flex items-start flex-wrap gap-2">
          <div className="rounded-lg bg-gray-300 w-12 h-12"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="flex items-center gap-2 justify-between">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <Separator
                orientation="vertical"
                className="h-4 w-px bg-gray-300"
              />
              <div className="flex gap-1">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section Skeleton */}
        <div className="flex items-center flex-wrap justify-between mt-4">
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-gray-300 rounded w-10 mb-1"></div>
            <div className="h-5 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-gray-300 rounded w-10 mb-1"></div>
            <div className="h-5 bg-gray-300 rounded w-8"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 bg-gray-300 rounded w-10 mb-1"></div>
            <div className="h-5 bg-gray-300 rounded w-8"></div>
          </div>
        </div>

        {/* Bottom Section Skeleton */}
        <div className="mt-4">
          <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="flex items-center gap-2 justify-between">
            <div className="h-4 bg-gray-300 rounded w-16"></div>
            <Separator
              orientation="vertical"
              className="h-4 w-px bg-gray-300"
            />
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        </div>

        {/* Allergies Skeleton */}
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-16"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-24"></div>
          </div>
        </div>

        {/* Buttons Skeleton */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full bg-[#f5f8ff] rounded-lg p-4 flex flex-col justify-between h-fit min-h-[200px]",
        className
      )}
    >
      {/* Top Section: Name, Gender, Age, Location */}
      <div className="flex items-start flex-wrap gap-2">
        <Image
          src={appointment?.patient?.picture}
          alt="doctor"
          width={50}
          height={50}
          className="rounded-lg"
        />
        <div className="flex-1">
          <h2 className="text-primary text-sm font-semibold flex items-center gap-1">
            {appointment?.patient?.display_name}{" "}
            <GenderMale className="w-4 h-4 fill-white" />
          </h2>
          <div className="flex items-center gap-2 justify-between">
            <p className="text-sm font-semibold">
              {appointment?.patient?.age} years old
            </p>
            <Separator
              orientation="vertical"
              className="h-4 w-px bg-[#e2e8f0]"
            />
            <div className="flex gap-1">
              <MapPin className="w-4 h-4" />
              <p className="text-xs font-normal leading-tight">
                {appointment?.patient?.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Blood Group, Height, Weight */}
      <div className="flex items-center flex-wrap justify-between mt-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal">Blood</p>
          <span className="text-base font-bold">
            {appointment?.patient?.blood_group}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal">Height</p>
          {/* <span className="text-base font-bold">{appointment?.height}</span> */}
          <span className="text-base font-bold">10</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal">Weight</p>
          {/* <span className="text-base font-bold">{appointment?.weight}</span> */}
          <span className="text-base font-bold">10</span>
        </div>
      </div>

      {/* Bottom Section: Speciality, Consultation Type, Appointment Date & Time, Allergies */}
      <div className="mt-4 flex flex-col justify-between flex-1">
        <div className="flex items-center flex-wrap justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal">Speciality</p>
            <span className="text-xs font-bold">{appointment?.speciality}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal">Consultation Type</p>
            <span className="text-xs font-bold">
              {appointment?.consultation_type}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-normal">Appointment Date & Time:</p>
          <div className="flex items-center flex-wrap justify-between gap-2">
            <span className="text-xs font-bold inline-flex items-center gap-1">
              <CalendarCheck2 className="w-4 h-4 relative" />{" "}
              {appointment?.appointment_date}
            </span>
            <Separator
              orientation="vertical"
              className="h-4 w-px bg-[#e2e8f0]"
            />
            <span className="text-xs font-bold inline-flex items-center gap-1">
              <Clock3 className="w-4 h-4 relative" />{" "}
              {formatTimeForUI(appointment?.scheduled_date.start_time)} -{" "}
              {formatTimeForUI(appointment?.scheduled_date.end_time)}
            </span>
          </div>
        </div>

        {appointment?.allergies && appointment?.allergies.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-normal">Allergies:</p>
            <div className="flex flex-wrap gap-2">
              {appointment?.allergies.map((allergy, index) => (
                <div
                  key={index}
                  className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5"
                >
                  {allergy}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message and Join Now Buttons */}
        <div className="mt-4 flex items-center flex-wrap xl:flex-nowrap justify-between gap-3">
          <Link
            href={`/${role === "patient" && "my-"}conversations/${
              appointment.appointmentId
            }`}
            className={cn(
              buttonVariants({ size: "sm", variant: "outline" }),
              "w-full"
            )}
          >
            Message
          </Link>

          <Link
            className={cn(
              buttonVariants({ size: "sm", variant: "default" }),
              "w-full",
              {
                "pointer-events-none cursor-not-allowed":
                  new Date(appointment.appointment_date) < new Date() ||
                  new Date(appointment.appointment_date) >
                    new Date(new Date().getTime() + 30 * 60 * 1000),
              }
            )}
            href={`/meeting/${appointment.appointmentId}`}
          >
            Join Meeting
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
