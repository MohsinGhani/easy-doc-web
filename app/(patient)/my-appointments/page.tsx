import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import MyAppointmentsList from "@/components/patient/MyAppointmentsList";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | My Appointments",
  description: "Here you can view & manage all your appointments",
};

const BannerData = {
  title: "My Appointments",
  description: "Here you can view all your appointments",
  location: [
    { name: "Home", path: "/" },
    { name: "My Appointments", path: "#" },
  ],
};

const AppAppointmentsPage = () => {
  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <MyAppointmentsList />
      </PatientLayout>
    </div>
  );
};

export default AppAppointmentsPage;
