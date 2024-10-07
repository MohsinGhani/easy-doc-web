"use client";

import LandingPage from "@/components/home/LandingPage";
import { PatientLayout } from "@/components/layout/patient-layout";
import { Navbar } from "@/components/navbar/Navbar";
import PatientFooter from "@/components/patient/Footer";

export default function Home() {
  return (
    <div className="">
      <Navbar className="relative" />

      <PatientLayout className="relative">
        <LandingPage />
      </PatientLayout>

      <PatientFooter />
    </div>
  );
}
