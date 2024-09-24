"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { paymentSchema, PaymentType } from "@/models/Appointment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "../auth/CustomFormField";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import { Loader } from "../common/Loader";
import { useRouter } from "next/navigation";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";

interface PaymentFormProps {
  appointmentId: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ appointmentId }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading } = useAppSelector((state) => state.auth);

  const form = useForm<PaymentType>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: PaymentType) => {
    try {
      const { type } = await dispatch(
        appointmentThunks.makePayment({
          appointmentId,
          data: data as Partial<Payment>,
        })
      );
      if (type === "appointment/createAppointment/fulfilled") {
        form.reset(); // Reset the form fields
        router.push(
          `/appointments/${appointmentId}/book-appointment/checkout?doctorName=${fetchedDoctor?.display_name}`
        );
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
    }
  };

  const { control, handleSubmit, watch } = form;

  if (doctorLoader || loading) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="gap-8 grid sm:grid-cols-2">
          {/* Name on card */}
          <CustomFormField
            name="name_on_card"
            label="Name on Card"
            fieldType={FormFieldType.INPUT}
            control={control}
          />

          {/* Card no */}
          <CustomFormField
            name="card_no"
            label="Card Number"
            fieldType={FormFieldType.INPUT}
            control={control}
          />

          {/* Expiry date */}
          <CustomFormField
            name="expiry_date"
            label="Expiry Date"
            fieldType={FormFieldType.INPUT}
            control={control}
          />

          {/* CVV */}
          <CustomFormField
            name="cvv"
            label="CVV"
            fieldType={FormFieldType.INPUT}
            control={control}
          />
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
