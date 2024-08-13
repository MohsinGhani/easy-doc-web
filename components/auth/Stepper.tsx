"use client";

import Steps from "rc-steps";
import "rc-steps/assets/index.css";
import Image from "next/image";
import { Status } from "rc-steps/lib/interface";
import { Ban, Check, Dot } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  activeStep: number;
  setActiveStep: (activeStep: number) => void;
  status: Status;
}

const Stepper = ({ activeStep = 0, setActiveStep, status }: StepperProps) => {
  const steps = [
    { title: "Select Role" },
    { title: "Personal Details" },
    { title: "Verification" },
  ];

  return (
    <Steps
      size="small"
      current={activeStep}
      labelPlacement="vertical"
      status={status}
      items={steps.map((step, index) => ({
        title: (
          <span
            className={cn(
              activeStep >= index &&
                "text-primary cursor-pointer hover:text-primary/80",
              "text-sm font-normal leading-[18px]"
            )}
          >
            {step.title}
          </span>
        ),
        onClick: () => activeStep >= index && setActiveStep(index),
      }))}
      stepIcon={({ status, index }) => {
        if (status === "finish") {
          return (
            <Check
              width={15}
              height={15}
              className="text-white rounded-full bg-primary w-full h-full"
            />
          );
        } else if (status === "process") {
          return (
            <Image
              src="/assets/icons/finishIcon.svg"
              alt="logo"
              width={16}
              height={16}
              className="text-white rounded-full bg-primary w-full h-full"
            />
          );
        } else if (status === "error") {
          return (
            <Ban
              width={15}
              height={15}
              className="text-white rounded-full bg-red-500 w-full h-full"
            />
          );
        } else if (status === "wait") {
          return (
            <div className="w-4 h-4 justify-center items-center inline-flex bg-[#e0e0e6] rounded-full">
              <div className="w-4 h-4 relative flex-col justify-start items-start flex" />
            </div>
          );
        }
        return index + 1;
      }}
    />
  );
};

export default Stepper;
