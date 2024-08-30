import { Navbar } from "@/components/navbar/Navbar";
import PatientFooter from "@/components/patient/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      {children}

      <PatientFooter />
    </>
  );
}
