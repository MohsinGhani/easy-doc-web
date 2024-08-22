"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import PatientsRequestList from "@/components/doctor/PatientsRequestList";

export default function PatientsRequestsPage() {
  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <h2 className="text-2xl font-medium mb-5">Patient&apos;s Requests</h2>
      <PatientsRequestList />
    </ContentLayout>
  );
}
