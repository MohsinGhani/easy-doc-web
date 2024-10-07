import AddServiceDialog from "@/components/doctor/AddServiceDialog";
import ManageServices from "@/components/doctor/ManageServices";
import { ContentLayout } from "@/components/layout/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Specialties & Services",
  description: "Here you can view all the specialties and services",
};

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
