"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import PatientsRequestList from "@/components/doctor/PatientsRequestList";

export default function PatientsRequestsPage() {
  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <PatientsRequestList />
    </ContentLayout>
  );
}
