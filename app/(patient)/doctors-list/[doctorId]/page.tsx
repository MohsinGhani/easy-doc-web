import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import React from "react";

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
    { name: "Doctors", path: "/doctors-list" },
    { name: "Doctor Details", path: "#" },
  ],
};

const DoctorDetailsPage = ({ params }: DoctorDetailsPageProps) => {
  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>DoctorDetailsPage {params.doctorId}</PatientLayout>
    </div>
  );
};

export default DoctorDetailsPage;
