"use client";

import AddServiceDialog from "@/components/doctor/AddServiceDialog";
import ManageServices from "@/components/doctor/ManageServices";
import { ContentLayout } from "@/components/layout/content-layout";

export default function SpecialitiesAndServicesPage() {
  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <div className="flex sm:flex-row items-center justify-between mb-5 gap-3 flex-col">
        <h2 className="text-2xl font-medium">Specialties & Services</h2>

        <AddServiceDialog />
      </div>

      <ManageServices />
    </ContentLayout>
  );
}
