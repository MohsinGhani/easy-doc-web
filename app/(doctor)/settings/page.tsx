import DoctorSettings from "@/components/doctor/DoctorSettings";
import { ContentLayout } from "@/components/layout/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Doctor Profile Settings",
  description: "Here you can view & manage your profile settings",
};

export default function DoctorProfilePage() {
  return (
    <ContentLayout title="Profile Settings">
      <DoctorSettings />
    </ContentLayout>
  );
}
