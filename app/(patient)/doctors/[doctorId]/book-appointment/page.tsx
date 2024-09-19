import AppointmentForm from "@/components/appointment/AppointmentForm";
import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";

interface BookAppointmentPageProps {
  params: {
    doctorId: string;
  };
}

const BannerData = {
  title: "Doctor Details",
  description: "",
  location: [
    { name: "Home", path: "/" },
    { name: "Doctors", path: "/doctors" },
    { name: "Book Appointment", path: "#" },
  ],
};

const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({
  params,
}) => {
  const { doctorId } = params;

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
