import PaymentForm from "@/components/appointment/PaymentForm";
import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";

interface AppointmentCheckoutPageProps {
  params: {
    appointmentId: string;
  };
  searchParams: {
    appointmentReason: string;
  };
}

const AppointmetnCheckoutPage: React.FC<AppointmentCheckoutPageProps> = ({
  params,
  searchParams,
}) => {
  const { appointmentId } = params;
  const appointmentReason = decodeURIComponent(
    searchParams.appointmentReason || "Appointment Details"
  );

  const BannerData = {
    title: "Book Appointment",
    description: "",
    location: [
      { name: "Home", path: "/" },
      { name: "Appointments", path: "/appointments" },
      { name: appointmentReason, path: `/appointments/${appointmentId}` },
      { name: "Checkout", path: "/checkout" },
    ],
  };

  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <PaymentForm appointmentId={appointmentId} />
      </PatientLayout>
    </div>
  );
};

export default AppointmetnCheckoutPage;
