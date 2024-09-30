import DoctorProfile from "@/components/patient/doctor-profile";
import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Doctor Details",
  description: "Find the best doctors near you",
};

interface DoctorDetailsPageProps {
  params: {
    doctorId: string;
  };
}

const BannerData = {
  title: "Doctor Details",
  description: "",
  location: [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Doctor Details", path: "#" },
  ],
};

const DoctorDetailsPage = ({ params }: DoctorDetailsPageProps) => {
  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <DoctorProfile doctorId={params.doctorId} />
      </PatientLayout>
    </div>
  );
};

export default DoctorDetailsPage;
