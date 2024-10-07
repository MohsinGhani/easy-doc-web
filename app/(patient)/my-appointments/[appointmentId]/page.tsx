import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Appointment Details",
  description: "View details of your appointment",
};

interface AppointmentDetailsPageProps {
  params: {
    appointmentId: string;
  };
}

const BannerData = {
  title: "Book Appointment",
  description: "",
  location: [
    { name: "Home", path: "/" },
    { name: "Appointments", path: "/my-appointments" },
    { name: "Appointment Details", path: `#` },
  ],
};

const AppointmentDetailsPage: React.FC<AppointmentDetailsPageProps> = ({
  params,
}) => {
  const { appointmentId } = params;

  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>APPOINTMENT DETAILS PAGE</PatientLayout>
    </div>
  );
};

export default AppointmentDetailsPage;
