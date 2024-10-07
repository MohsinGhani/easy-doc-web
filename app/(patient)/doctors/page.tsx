import PatientsLandingPage from "@/components/patient/PatientsLandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Doctors",
  description: "Find the best doctors near you",
};

export default function DoctorsListingPage() {
  return <PatientsLandingPage />;
}
