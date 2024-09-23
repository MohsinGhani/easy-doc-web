import React from "react";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface PriceDetailsProps {
  consultingFee: number;
  taxRate?: number; // Optional tax rate prop (default value can be set inside the component)
  onProceed: () => void;
}

const PriceDetails: React.FC<PriceDetailsProps> = ({
  consultingFee,
  taxRate = 0.07, // Default tax rate of 7%
  onProceed,
}) => {
  // Calculate tax and service fees based on the consulting fee
  const taxAndServiceFees = consultingFee * taxRate;

  // Calculate the total amount
  const total = consultingFee + taxAndServiceFees;

  return (
    <div className="bg-white max-w-xs">
      <div className="mb-4 p-5 rounded-t-xl bg-primary text-white">
        <h2 className="text-lg font-semibold">Price Details</h2>
      </div>
      <CardContent className="rounded-xl w-full">
        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Consulting Fee</p>
          <p className="font-medium">${consultingFee.toFixed(2)}</p>
        </div>

        <div className="flex justify-between mb-2">
          <p className="text-gray-700">Tax and service fees</p>
          <p className="font-medium">${taxAndServiceFees.toFixed(2)}</p>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-bold mb-4">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>

        <Button
          onClick={onProceed}
          variant={"default"}
          size={"xl"}
          className="w-full"
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </div>
  );
};

export default PriceDetails;
