import PayoutSettings from "@/components/doctor/PayoutSettings";
import { ContentLayout } from "@/components/layout/content-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Payment Settings",
  description: "Here you can view & manage your payments & their settings",
};

const PaymentsPage = () => {
  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <PayoutSettings />
    </ContentLayout>
  );
};

export default PaymentsPage;
