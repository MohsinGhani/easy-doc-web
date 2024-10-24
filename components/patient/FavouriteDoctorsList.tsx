"use client";

import React, { useEffect } from "react";
import DoctorCard from "./DoctorCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { favouriteThunks } from "@/lib/features/favourite/favouriteThunks";
import { Loader } from "../common/Loader";

export default function FavouriteDoctorsList() {
  const dispatch = useAppDispatch();
  const { allFavourites, loading } = useAppSelector((state) => state.favourite);
  const { userId } = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    userId && dispatch(favouriteThunks.fetchAllFavourites());
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full lg:col-span-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allFavourites.map((fav, index) => (
          <DoctorCard doctor={fav.doctor} key={index} />
        ))}
      </div>
    </div>
  );
}
