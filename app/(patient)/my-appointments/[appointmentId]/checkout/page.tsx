"use client";

import PaymentForm from "@/components/appointment/PaymentForm";
import { PatientLayout } from "@/components/layout/patient-layout";
import Banner from "@/components/patient/Banner";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import { Loader } from "@/components/common/Loader";
import PriceDetails from "@/components/appointment/PriceDetails";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

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
  const dispatch = useAppDispatch();
  const [clientSecret, setClientSecret] = useState("");
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
      { name: "Checkout", path: "#" },
    ],
  };

  const { fetchedAppointment, loading } = useAppSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(appointmentThunks.fetchAppointmentById(appointmentId));
  }, [dispatch, appointmentId]);

  useEffect(() => {
    if (!fetchedAppointment) return;

    dispatch(
      appointmentThunks.makePaymentIntent({
        appointmentId: fetchedAppointment.appointmentId,
        amount: fetchedAppointment.amount,
        patientId: fetchedAppointment.patientId,
        doctorId: fetchedAppointment.doctorId,
        stripeAccountId: fetchedAppointment.doctor.stripeAccountId,
      })
    ).then((res: any) => {
      if (res.payload && res.payload.clientSecret) {
        setClientSecret(res.payload.clientSecret);
      }
    });
  }, [dispatch, fetchedAppointment]);

  const options = {
    clientSecret,
  };

  if (loading) return <Loader />;

  if (!clientSecret) return null;

  return (
    <div className="w-full h-full">
      <Banner data={BannerData} />

      <PatientLayout>
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm
            appointmentId={appointmentId}
            amount={fetchedAppointment?.amount || 0}
          />
        </Elements>
      </PatientLayout>
    </div>
  );
};

export default AppointmetnCheckoutPage;
