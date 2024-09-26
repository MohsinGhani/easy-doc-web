import { PatientLayout } from "@/components/layout/patient-layout";
import SuccessPage from "@/components/SuccessPage";
import React from "react";

interface AppointmentSuccessPageProps {
  params: {
    appointmentId: string;
  };
  // searchParams: {
  //   payment_intent: string;
  //   payment_intent_client_secret: string;
  //   redirect_status: string;
  // };
}

const AppointmentSuccesspage: React.FC<AppointmentSuccessPageProps> = ({
  params,
  // searchParams,
}) => {
  // const { payment_intent, payment_intent_client_secret, redirect_status } =
  //   searchParams;

  // const decodedPaymentIntent = decodeURIComponent(payment_intent || "");
  // const decodedPaymentIntentClientSecret = decodeURIComponent(
  //   payment_intent_client_secret || ""
  // );
  // const decodedRedirectStatus = decodeURIComponent(redirect_status || "");

  return (
    <PatientLayout>
      <SuccessPage
        heading="Appointment Booked Successfully!"
        subHeading="Your appointment has been successfully booked. You can view the details of your appointment below."
        linkHref={`/my-appointments/${params.appointmentId}`}
        linkText="View Details"
        open
      />
    </PatientLayout>
  );
};

export default AppointmentSuccesspage;
