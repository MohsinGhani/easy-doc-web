"use client";

import React from "react";
import { useAppSelector } from "@/lib/hooks";
import { Loader } from "../common/Loader";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import PriceDetails from "./PriceDetails";
import { DOMAIN } from "@/constants";

interface PaymentFormProps {
  appointmentId: string;
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ appointmentId, amount }) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const { loading: appointmentLoader } = useAppSelector(
    (state) => state.appointment
  );

  if (appointmentLoader || loading) return <Loader />;

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${DOMAIN}/appointments/${appointmentId}/success`,
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("Payment successful");
    }
  };

  return (
    <form className="grid lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
      <div className="lg:col-span-2">
        <PaymentElement />
      </div>
      <PriceDetails consultingFee={amount} />
    </form>
  );
};

export default PaymentForm;
