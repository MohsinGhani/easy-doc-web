import AppointmentForm from "@/components/appointment/AppointmentForm";
import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import PatientSettings from "@/components/patient/PatientSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Patient Profile Settings",
  description: "Here you can view & manage your profile settings",
};

interface BookAppointmentPageProps {
  searchParams: {};
}

const BannerData = {
  title: "Book Appointment",
  description: "",
  location: [
    { name: "Home", path: "/" },
    { name: "My Settings", path: "#" },
  ],
};

const MySettingsPage = ({ searchParams }: BookAppointmentPageProps) => {
  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <PatientSettings />
      </PatientLayout>
    </div>
  );
};

export default MySettingsPage;
