import React from "react";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useAppSelector } from "@/lib/hooks";

interface PriceDetailsProps {
  consultingFee: number;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({ consultingFee }) => {
  const { loading: appointmentLoading } = useAppSelector(
    (state) => state.appointment
  );

  return (
    <div className="max-w-sm">
      <div className="p-5 rounded-t-xl bg-primary text-white">
        <h2 className="text-lg font-semibold">Price Details</h2>
      </div>
      <CardContent className="rounded-xl rounded-t-none w-full px-6 shadow">
        {consultingFee > 0 ? (
          <>
            <div className="flex justify-between text-lg font-bold mb-4">
              <p>Total</p>
              <p>${consultingFee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between text-sm mb-4 text-gray-500">
              <p>Taxes included and will be calculated by Stripe</p>
            </div>

            <Button
              variant={"default"}
              size={"xl"}
              className="w-full"
              type="submit"
              disabled={appointmentLoading}
            >
              Proceed to Checkout
            </Button>
          </>
        ) : (
          // Display message when consultingFee is 0
          <div className="text-center py-6 text-gray-600">
            <p>Please select a service to see the consulting fee.</p>
          </div>
        )}
      </CardContent>
    </div>
  );
};

export default PriceDetails;
