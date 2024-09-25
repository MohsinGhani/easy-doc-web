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

  const handleProceedToCheckout = () => {
    // Handle checkout logic here
    console.log("Proceed to checkout clicked!");
  };

  // Calculate the platform fee (5% of consulting fee)
  const platformFee = consultingFee * 0.05;

  // Calculate the total amount (consulting fee + platform fee)
  const total = consultingFee + platformFee;

  return (
    <div className="bg-white max-w-xs">
      <div className="mb-4 p-5 rounded-t-xl bg-primary text-white">
        <h2 className="text-lg font-semibold">Price Details</h2>
      </div>
      <CardContent className="rounded-xl w-full px-6 shadow">
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Consulting Fee</p>
          <p className="font-medium">${consultingFee.toFixed(2)}</p>
        </div>

        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Platform Fee (5%)</p>
          <p className="font-medium">${platformFee.toFixed(2)}</p>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold mb-4">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <div className="flex justify-between text-sm mb-4 text-gray-500">
          <p>Taxes included and will be calculated by Stripe</p>
        </div>

        <Button
          onClick={handleProceedToCheckout}
          variant={"default"}
          size={"xl"}
          className="w-full"
          type="submit"
          disabled={appointmentLoading}
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </div>
  );
};

export default PriceDetails;
