import React from "react";
import DoctorsList from "./DoctorsList";
import FiltersSidebar from "./FiltersSidebar";
import Banner from "./Banner";

const BannerData = {
  title: "OUR SPECIALIST DOCTORS",
  description:
    "You only have to know one thing that you can learn anything anywhere to do you discover yourself.",
  location: [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "#" },
  ],
};

const PatientsLandingPage = () => {
  return (
    <>
      <Banner data={BannerData} />

      <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-4 gap-6 lg:px-[100px] sm:px-6 px-4">
        <FiltersSidebar />
        <DoctorsList />
      </div>
    </>
  );
};

export default PatientsLandingPage;
