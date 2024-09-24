import AppointmentForm from "@/components/appointment/AppointmentForm";
import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";

interface BookAppointmentPageProps {
  params: {
    doctorId: string;
  };
  searchParams: {
    doctorName: string;
  };
}

const BookAppointmentPage = ({
  params,
  searchParams,
}: BookAppointmentPageProps) => {
  const { doctorId } = params;
  const doctorName = decodeURIComponent(
    searchParams.doctorName || "Doctor Details"
  );

  const BannerData = {
    title: "Book Appointment",
    description: "",
    location: [
      { name: "Home", path: "/" },
      { name: "Doctors", path: "/doctors" },
      { name: doctorName, path: `/doctors/${doctorId}` },
      { name: "Book Appointment", path: "#" },
    ],
  };

  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <AppointmentForm doctorId={doctorId} />
      </PatientLayout>
    </div>
  );
};

export default BookAppointmentPage;
