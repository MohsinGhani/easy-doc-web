"use client";

import LandingPage from "@/components/home/LandingPage";
import { Navbar } from "@/components/navbar/Navbar";
import PatientFooter from "@/components/patient/Footer";
import PatientsLandingPage from "@/components/patient/PatientsLandingPage";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";
export default function Home() {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const pathname = usePathname()
  return (
    <div>
      {pathname !== "/" && <Navbar/>}
      {/* <Navbar /> */}
      {isLoggedIn ? (
        <>
          <div className="flex flex-col items-center">
            <h1 className="text-center text-3xl text-primary">
              Welcome, {user?.email}
            </h1>
            <h6 className="text-center text-muted-foreground">
              Your role is, {user?.role}
              <br />
              You are {user?.verified ? "" : "not"} verified
            </h6>
          </div>
          <PatientFooter />
        </>
      ) : (
        <LandingPage />
      )}
    </div>
  );
}
