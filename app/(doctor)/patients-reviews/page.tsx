"use client";

import PatientsReviewsList from "@/components/doctor/PatientsReviewsList";
import { ContentLayout } from "@/components/layout/content-layout";

const ratings = [
  {
    name: "Ashwind",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=ashwind",
  },
  {
    name: "Julie",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=julie",
  },
  {
    name: "Mark",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=mark",
  },
  {
    name: "John",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
];

export default function PatientsReviewaPage() {
  return (
    <ContentLayout title="Doctor | Patient's Reviews">
      <h2 className="text-2xl font-medium mb-5">Patient&apos;s Reviews</h2>

      <PatientsReviewsList ratings={ratings} />
    </ContentLayout>
  );
}
