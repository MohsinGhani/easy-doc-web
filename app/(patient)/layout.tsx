import { Navbar } from "@/components/navbar/Navbar";
import PatientFooter from "@/components/patient/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {children}

      <PatientFooter />
    </div>
  );
}
