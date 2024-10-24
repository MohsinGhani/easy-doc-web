import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import FavouriteDoctorsList from "@/components/patient/FavouriteDoctorsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Easy Doc | Favourites",
  description: "Here you can see your favourite doctors",
};

const BannerData = {
  title: "Favourites",
  description: "",
  location: [
    { name: "Home", path: "/" },
    { name: "Favourites", path: "#" },
  ],
};

const FavouritesPage = () => {
  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <FavouriteDoctorsList />
      </PatientLayout>
    </div>
  );
};

export default FavouritesPage;
