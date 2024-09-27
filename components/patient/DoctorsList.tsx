"use client";

import React, { useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { API_URL } from "@/constants";
import axios from "axios";

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
  // const [doctors, setDoctors] = useState([])
  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const { data } = await axios.get(API_URL + "/doctors/all");
        console.log(data);
      } catch (error) {
        console.log("🚀 ~ getAllDoctors ~ error:", error);
      }
    };

    getAllDoctors();
  }, []);

  return (
    <div className="w-full lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <DoctorCard doctor={doctor} key={index} />
        ))}
      </div>
    </div>
  );
}
