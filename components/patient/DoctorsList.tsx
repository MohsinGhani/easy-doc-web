"use client";

import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import apiClient from "@/helpers/apiClient";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getAllDoctors = async () => {
      try {
        const { data } = await apiClient.get("/doctors/all");
        setDoctors(data.data || []);
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
