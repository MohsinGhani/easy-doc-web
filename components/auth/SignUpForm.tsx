"use client";

import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserSignup, UserSignupSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CardDescription } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import CustomButton from "./CustomButton";
import LogoText from "../LogoText";
import SuccessPage from "./SuccessPage";
import SelectRoleForm from "./SelectRoleForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import EnterOtpForm from "./EnterOtpForm";
import Stepper from "./Stepper";
import { Status } from "rc-steps/lib/interface";

function getStepContent(step: number, destination?: string) {
  switch (step) {
    case 0:
      return <SelectRoleForm />;
    case 1:
      return <PersonalDetailsForm />;
    case 2:
      return <EnterOtpForm destination={destination} />;
    default:
      return null;
  }
}

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<Status>("process");
  const { loading } = useAppSelector((state) => state.auth);
  const destinationRef = useRef("");

  const form = useForm<UserSignup>({
    resolver: zodResolver(UserSignupSchema),
  });

  const onSubmit = ({ confirmationCode, email, password }: UserSignup) => {
    dispatch(
      authThunks.confirmCode({
        values: { confirmationCode, email, password },
        router,
      })
    ).then((data) => {
      if (data.type.includes("fulfilled")) {
        setActiveStep(activeStep + 1);
      }
    });
  };

  const handleNext = async () => {
    let keysToCheck: (keyof UserSignup)[] = [];

    if (activeStep === 0) {
      keysToCheck = ["role"] as const;
    } else if (activeStep === 1) {
      keysToCheck = ["name", "email", "password", "confirmPassword"] as const;
    } else if (activeStep === 2) {
      keysToCheck = ["confirmationCode"] as const;
    }

    const res = await form.trigger(keysToCheck);

    if (!res) {
      setStatus("error");
      return;
    }

    if (activeStep === 1) {
      const { given_name, family_name, email, password, role } =
        form.getValues();

      await dispatch(
        authThunks.signup({
          values: {
            given_name,
            family_name,
            email,
            password,
            role,
          },
          router,
        })
      ).then((data) => {
        if (data.type === "auth/signup/rejected") {
          setStatus("error");
          return;
        }

        destinationRef.current = data.payload.destination;
      });
    }

    setActiveStep(activeStep + 1);
    setStatus("process");
  };

  if (activeStep === 3) {
    return <SuccessPage />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg flex flex-col gap-8 pt-[52px] "
      >
        <LogoText className="text-4xl text-center" />

        <Stepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          status={status}
        />

        {getStepContent(activeStep, destinationRef.current)}

        <>
          {activeStep === 2 ? (
            <CustomButton loading={loading} type="submit" className="w-full">
              {loading ? (
                <>
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </CustomButton>
          ) : (
            <Button
              onClick={handleNext}
              disabled={loading}
              type="button"
              size={"xl"}
            >
              {loading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              {loading ? "Loading..." : "Next"}
            </Button>
          )}
        </>

        <CardDescription className="text-center">
          Already have an account?{" "}
          <Link className="font-semibold text-blue-500" href={"/auth/sign-in"}>
            Sign in
          </Link>
        </CardDescription>
        <CardDescription className="text-center">
          © Copyright 2024, All Rights Reserved by EasyDoc
        </CardDescription>
      </form>
    </Form>
  );
};

export default SignUpForm;
