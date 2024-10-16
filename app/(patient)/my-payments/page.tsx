import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import MyPaymentsList from "@/components/patient/MyPaymentsList";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | My Payments",
  description: "Here you can view all your payments",
};

const BannerData = {
  title: "My Payments",
  description: "",
  location: [
    { name: "Home", path: "/" },
    { name: "My Payments", path: "#" },
  ],
};

const MyPaymentsPage = () => {
  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <MyPaymentsList />
      </PatientLayout>
    </div>
  );
};

export default MyPaymentsPage;
