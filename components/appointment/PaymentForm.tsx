"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useAppSelector } from "@/lib/hooks";
import { Loader } from "../common/Loader";
import { DOMAIN } from "@/constants";

interface PaymentFormProps {
  appointmentId: string;
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ appointmentId, amount }) => {
  const { loading } = useAppSelector((state) => state.auth);
  const [loader, setLoader] = useState(false);
  const { loading: appointmentLoader, fetchedAppointment } = useAppSelector(
    (state) => state.appointment
  );

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoader(true);
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${DOMAIN}/my-appointments/${appointmentId}/success`,
        },
      });
      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Payment successful");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  if (appointmentLoader || loading) return <Loader />;

  return (
    <form className="grid lg:grid-cols-3 gap-8" onSubmit={handleSubmit}>
      <div className="lg:col-span-2">
        <PaymentElement
          options={{
            defaultValues: {
              billingDetails: {
                name: fetchedAppointment?.patient?.display_name || "", // Prefill if available
                email: fetchedAppointment?.patient?.email || "",
                address: {
                  line1: fetchedAppointment?.patient?.address || "",
                  city: fetchedAppointment?.patient?.city || "",
                  state: fetchedAppointment?.patient?.state || "",
                  postal_code: fetchedAppointment?.patient?.zip_code || "",
                  country: fetchedAppointment?.patient?.country || "US", // Set default country
                },
              },
            },
            fields: {
              billingDetails: {
                name: "auto", // Disable name input if already provided
                email: "auto", // Disable email input if already provided
                address: "auto", // Show address fields auto
              },
            },
            business: {
              name: fetchedAppointment?.doctor.display_name || "Doctor", // Display business name in the Payment Element
            },
          }}
        />
      </div>
      <Button
        variant={"default"}
        size={"xl"}
        className="w-full"
        type="submit"
        disabled={appointmentLoader || loading || loader || !stripe || !elements}
      >
        Complete Checkout
      </Button>
    </form>
  );
};

export default PaymentForm;
