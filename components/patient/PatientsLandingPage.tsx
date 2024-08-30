"use client";

import React from "react";
import DoctorsList from "./DoctorsList";
import FiltersSidebar from "./FiltersSidebar";
import Banner from "./Banner";
import { PatientLayout } from "../layout/patient-layout";

const BannerData = {
  title: "OUR SPECIALIST DOCTORS",
  description:
    "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
  location: [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "#" },
  ],
};

const PatientsLandingPage = () => {
  return (
    <>
      <Banner data={BannerData} />

      <PatientLayout>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FiltersSidebar />
          <DoctorsList />
        </div>
      </PatientLayout>
    </>
  );
};

export default PatientsLandingPage;
