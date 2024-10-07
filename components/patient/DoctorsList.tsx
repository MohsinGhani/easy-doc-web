"use client";

import React, { useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import { Loader } from "../common/Loader";

export default function DoctorsList() {
  const dispatch = useAppDispatch();
  const { allDoctors: doctors, loading } = useAppSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(doctorThunks.fetchAllDoctors());
    }
  }, [dispatch, doctors.length]);

  if (loading) return <Loader />;

  return (
    <div className="w-full lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <DoctorCard doctor={doctor} key={index} />
        ))}
      </div>
    </div>
)}