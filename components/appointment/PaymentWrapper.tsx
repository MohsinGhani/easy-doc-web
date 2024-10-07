"use client";

import PaymentForm from "@/components/appointment/PaymentForm";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Loader } from "@/components/common/Loader";
import { stripePubKey } from "@/constants";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(stripePubKey);

interface PaymentWrapperProps {
  appointmentId: string;
}

const PaymentWrapper: React.FC<PaymentWrapperProps> = ({ appointmentId }) => {
  const dispatch = useAppDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const router = useRouter();

  const { fetchedAppointment, loading } = useAppSelector(
    (state) => state.appointment
  );

  useEffect(() => {
    dispatch(appointmentThunks.fetchAppointmentById(appointmentId));
  }, [dispatch, appointmentId]);

  useEffect(() => {
    if (!fetchedAppointment) return;

    if (fetchedAppointment.status !== "PAYMENT_PENDING") {
      router.push(`/my-appointments/${appointmentId}`);
      return;
    }

    dispatch(
      appointmentThunks.makePaymentIntent({
        appointmentId: fetchedAppointment.appointmentId,
        amount: fetchedAppointment.amount,
        patientId: fetchedAppointment.patientId,
        doctorId: fetchedAppointment.doctorId,
        stripeAccountId: fetchedAppointment.doctor.stripeAccountId,
        email: fetchedAppointment.patient.email,
      })
    ).then((res: any) => {
      if (res.payload && res.payload.clientSecret) {
        setClientSecret(res.payload.clientSecret);
      }
    });
  }, [dispatch, fetchedAppointment, appointmentId, router]);

  const options = {
    clientSecret,
  };

  if (loading) return <Loader />;

  if (!clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm
        appointmentId={appointmentId}
        amount={fetchedAppointment?.amount || 0}
      />
    </Elements>
  );
};

export default PaymentWrapper;
