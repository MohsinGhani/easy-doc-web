import { ContentLayout } from "@/components/layout/content-layout";
import PatientsRequestList from "@/components/doctor/PatientsRequestList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Patient's Requests",
  description: "Here you can view all the patient's requests",
};

export default function PatientsRequestsPage() {
  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <h2 className="text-2xl font-medium mb-5">Patient&apos;s Requests</h2>
      <PatientsRequestList />
    </ContentLayout>
  );
}
