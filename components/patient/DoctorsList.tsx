import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { CardContent } from "../ui/card";

const doctors: Doctor[] = [
  {
    name: "Dr. John",
    specialty: "Dentist",
    experience: "05 years experience",
    location: "Florida, USA",
    rating: 4,
    available: true,
    fee: 400,
    imageUrl:
      "https://randomuser.me/api/portraits/men/1.jpg?height=300&width=300",
  },
  {
    name: "Dr. John",
    specialty: "Dentist",
    experience: "05 years experience",
    location: "Florida, USA",
    rating: 4,
    available: true,
    fee: 400,
    imageUrl:
      "https://randomuser.me/api/portraits/men/1.jpg?height=300&width=300",
  },
  {
    name: "Dr. John",
    specialty: "Dentist",
    experience: "05 years experience",
    location: "Florida, USA",
    rating: 4,
    available: true,
    fee: 400,
    imageUrl:
      "https://randomuser.me/api/portraits/men/1.jpg?height=300&width=300",
  },
];

export default function DoctorsList() {
  return (
    <div className="w-full lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
            <DoctorCard doctor={doctor} />
          
        ))}
      </div>
    </div>
  );
}
