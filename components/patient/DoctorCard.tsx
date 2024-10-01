"use client";

import { CardContent } from "@/components/ui/card";
import {  Heart, Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Crown } from "../icons";

interface DoctorCardProps {
  doctor: User;
  isBookingCard?: boolean;
  customImage?: string;  
}

const DoctorCard = ({ doctor, customImage }: DoctorCardProps) => {
  if (!doctor) return null;

  return (
    <CardContent className="rounded-lg shadow-md overflow-hidden sm:p-4 p-0 space-y-4 max-w-sm">
      <div className="relative">
        <div className="w-full min-h-44 rounded-lg p-2 ">
          <Image
            src={customImage || doctor.picture} 
            alt={doctor.display_name}
            width={300}
            height={300}
            className="w-full h-full object-cover bg-no-repeat rounded-lg "
          />
        </div>
        <div className="absolute top-4 left-4  bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {doctor.overallRating}/5
        </div>
        <button className="w-8 h-8 absolute top-4 right-4 pl-1 text-black rounded-3xl hover:text-red-500 transition-colors bg-white">
          <Heart className="w-6 h-6" />
        </button>
      </div>

      <div className="sm:p-0 p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {doctor.display_name} <Crown className="w-4 h-4" />
            </h2>
            <p className="text-sm text-primary">{doctor.designation}</p>
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
            {doctor.years_of_experience.toString().padStart(2, '0')} years experience
          </p>



                 </div>
                 <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-600" /> 
          <p className="text-sm text-gray-600">{doctor.location}</p>
        </div> 

        <div className="flex justify-between items-center">
          <Link
            href={`/doctors/${doctor.userId}`}
            className="text-[#09090B]  text-sm font-medium p-2 border border-[#E4E4E7]"
          >
            View details
          </Link>
          <span className="text-[#FAFAFA]  bg-[#4D77FF] p-2 font-medium rounded-sm  ">Fee: ${doctor.average_fee.toFixed(0)}</span>
        </div>
      </div>
    </CardContent>
  );
};

export default DoctorCard;