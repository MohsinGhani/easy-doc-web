import DoctorsList from "@/components/doctors/DoctorsList";
import DoctorsListBanner from "@/components/doctors/DoctorsListBanner";
import Filters from "@/components/doctors/Filters";
import ProfilesFoundCount from "@/components/doctors/ProfilesFoundCount";
import React from "react";

const DoctorsListPage = () => {
  return (
    <>
      <DoctorsListBanner />

      <div className="xl:px-[72px] lg:px-10 px-4">
        <ProfilesFoundCount count={110} text="Doctors" />

        <div className="flex gap-6 @container">
          <Filters />

          <DoctorsList />
        </div>
      </div>
    </>
  );
};

export default DoctorsListPage;
