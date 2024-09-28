import { PatientLayout } from "@/components/layout/patient-layout";
import SuccessPage from "@/components/SuccessPage";
import React from "react";

interface AppointmentSuccessPageProps {
  params: {
    appointmentId: string;
  };
}

const AppointmentSuccesspage: React.FC<AppointmentSuccessPageProps> = ({
  params,
}) => {
  return (
    <PatientLayout>
      <SuccessPage
        heading="Appointment Booked Successfully!"
        subHeading="Your appointment has been successfully booked. You can view the details of your appointment below."
        linkHref={`/my-appointments/${params.appointmentId}`}
        linkText="Go to Appointment"
        open
      />
    </PatientLayout>
  );
};

export default AppointmentSuccesspage;
