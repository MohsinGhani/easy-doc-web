import Image from "next/image";
import { Separator } from "../ui/separator";
import { CalendarCheck2, Clock3, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { GenderMale } from "../icons";
import { Appointment } from "@/types/appointment";

interface AppointmentCardProps {
  className?: string;
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  className,
  appointment,
}) => {
  return (
    <div
      className={cn(
        "w-full bg-[#f5f8ff] rounded-lg p-4 flex flex-col justify-between h-fit",
        className
      )}
    >
      {/* Top Section: Name, Gender, Age, Location */}
      <div className="flex items-start flex-wrap gap-2">
        <Image
          src={`https://avatar.iran.liara.run/public/${Math.floor(
            Math.random() * 100
          )}`}
          alt="doctor"
          width={50}
          height={50}
          className="rounded-lg"
        />

        <div className="flex-1">
          <h2
            className={cn(
              "text-primary text-sm font-semibold flex items-center gap-1"
            )}
          >
            {appointment.patientName}{" "}
            <GenderMale className="w-4 h-4 fill-white" />
          </h2>
          <div className="flex items-center gap-2 justify-between">
            <p className="text-sm font-semibold">{appointment.age} years old</p>
            <Separator
              orientation="vertical"
              className="h-4 w-px bg-[#e2e8f0]"
            />
            <div className="flex gap-1">
              <MapPin className="w-4 h-4" />
              <p className="text-xs font-normal leading-tight">
                {appointment.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Blood Group, Height, Weight */}
      <div className="flex items-center flex-wrap justify-between mt-4">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal">Blood</p>
          <span className="text-base font-bold">{appointment.bloodGroup}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal">Height</p>
          <span className="text-base font-bold">{appointment.height}</span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-normal">Weight</p>
          <span className="text-base font-bold">{appointment.weight}</span>
        </div>
      </div>

      {/* Bottom Section: Speciality, Consultation Type, Appointment Date & Time, Allergies */}
      <div className="mt-4 flex flex-col justify-between flex-1">
        <div className="flex items-center flex-wrap justify-between gap-2">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal">Speciality</p>
            <span className="text-xs font-bold">{appointment.speciality}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal">Consultation Type</p>
            <span className="text-xs font-bold">
              {appointment.consultationType}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-normal">Appointment Date & Time:</p>
          <div className="flex items-center flex-wrap justify-between gap-2">
            <span className="text-xs font-bold inline-flex items-center gap-1">
              <CalendarCheck2 className="w-4 h-4 relative" />{" "}
              {appointment.appointmentDate}
            </span>
            <Separator
              orientation="vertical"
              className="h-4 w-px bg-[#e2e8f0]"
            />
            <span className="text-xs font-bold inline-flex items-center gap-1">
              <Clock3 className="w-4 h-4 relative" />{" "}
              {appointment.appointmentTime}
            </span>
          </div>
        </div>

        {appointment.allergies && appointment.allergies.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-normal">Allergies:</p>
            <div className="flex flex-wrap gap-2">
              {appointment.allergies.map((allergy, index) => (
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
          <Button className="w-full" variant={"outline"}>
            Message
          </Button>
          <Button className="w-full">Join Now</Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
