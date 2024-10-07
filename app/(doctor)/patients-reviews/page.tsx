import PatientsReviewsList from "@/components/doctor/PatientsReviewsList";
import { ContentLayout } from "@/components/layout/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Patient's Reviews",
  description: "Here you can view all the patient's reviews",
};

export default function PatientsReviewaPage() {
  return (
    <ContentLayout title="Doctor | Patient's Reviews">
      <h2 className="text-2xl font-medium mb-5">Patient&apos;s Reviews</h2>

      <PatientsReviewsList />
    </ContentLayout>
  );
}
