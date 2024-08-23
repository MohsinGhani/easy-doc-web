"use client";

import { CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <CardContent className="rounded-lg shadow-md overflow-hidden sm:p-4 p-0">
      <div className="relative">
        <Image
          src={doctor.imageUrl}
          alt={doctor.name}
          width={300}
          height={300}
          className="w-full h-56 object-cover rounded-lg"
        />
        <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center">
          <Star className="w-4 h-4 mr-1 fill-current" />
          {doctor.rating}/5
        </div>
        <button className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors">
          <Heart className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {doctor.name}{" "}
              <Image
                src={"/assets/icons/crown.svg"}
                width={20}
                height={20}
                alt="crown icon"
              />
            </h2>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
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
        <p className="text-sm text-gray-600 mb-1">{doctor.experience}</p>
        <p className="text-sm text-gray-600 mb-4">{doctor.location}</p>
        <div className="flex justify-between items-center">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View details
          </button>
          <span className="text-gray-900 font-semibold">
            Fee: ${doctor.fee}
          </span>
        </div>
      </div>
    </CardContent>
  );
};

export default DoctorCard;
