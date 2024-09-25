"use client";

import LandingPage from "@/components/home/LandingPage";
import { PatientLayout } from "@/components/layout/patient-layout";
import PatientFooter from "@/components/patient/Footer";

export default function Home() {
  return (
    <PatientLayout className="relative">
      <div className="">
        <LandingPage />

        <PatientFooter />
      </div>
    </PatientLayout>
  );
}
