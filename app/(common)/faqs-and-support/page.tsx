import { ContentLayout } from "@/components/layout/content-layout";
import Faqs from "@/components/doctor/Faqs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Faqs And Support",
  description: "Here you can view all the FAQs and support",
};

export default function FaqsAndSupportPage() {
  return (
    <ContentLayout title="Doctor | Support And Contact">
      <Faqs />
    </ContentLayout>
  );
}
