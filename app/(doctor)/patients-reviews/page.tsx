import PatientsReviewsList from "@/components/doctor/PatientsReviewsList";
import { ContentLayout } from "@/components/layout/content-layout";

export default function PatientsReviewaPage() {
  return (
    <ContentLayout title="Doctor | Patient's Reviews">
      <h2 className="text-2xl font-medium mb-5">Patient&apos;s Reviews</h2>

      <PatientsReviewsList />
    </ContentLayout>
  );
}
