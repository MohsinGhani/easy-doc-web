import { ContentLayout } from "@/components/layout/content-layout";
import { Metadata } from "next";
import AllAppointments from "@/components/doctor/AllAppointments";

export const metadata: Metadata = {
  title: "Easy Doc | Appointments",
  description: "Here you can view & manage all your appointments",
};

const AppointmentsPage = () => {
  return (
    <ContentLayout title="Appointments">
      <AllAppointments />
    </ContentLayout>
  );
};

export default AppointmentsPage;
