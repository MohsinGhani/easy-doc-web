"use client";

import Link from "next/link";
import LogoText from "@/components/LogoText";

import { useRef, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { UserSignup, UserSignupSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { SpinnerIcon } from "@/components/ui/icons";
import { SignUpStepper } from "@/components/auth/Stepper";
import { Status } from "rc-steps/lib/interface";
import { useAuth } from "@/hooks/useAuth";
import { getSignupFormContent } from "@/helpers/getStepContent";
import SuccessPage from "../SuccessPage";

const SignUpForm = () => {
  const { signup, confirmCode } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<Status>("process");
  const { loading, error } = useAppSelector((state) => state.auth);
  const destinationRef = useRef("");

  const form = useForm<UserSignup>({
    resolver: zodResolver(UserSignupSchema),
  });

  const onSubmit = (values: UserSignup) => {
    confirmCode(values);
    if (!error && !loading) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleNext = async () => {
    let keysToCheck: (keyof UserSignup)[] = [];

    if (activeStep === 0) {
      keysToCheck = ["role"] as const;
    } else if (activeStep === 1) {
      keysToCheck = [
        "given_name",
        "family_name",
        "email",
        "password",
        "confirmPassword",
      ] as const;
      if (form.getValues().role === "doctor") {
        keysToCheck.push("licence");
      }
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

      console.log(4);

      const values = {
        given_name,
        family_name,
        email,
        password,
        role,
        licence: role === "doctor" ? form.getValues().licence : "",
      };

      console.log(5);

      signup(values).then((data: any) => {
        if (data.error) {
          return setStatus("error");
        }
      });

      destinationRef.current = email;
    }

    setActiveStep(activeStep + 1);
    setStatus("process");
  };

  if (activeStep === 3) {
    return (
      <SuccessPage heading="Account Created!" linkText="Okay" linkHref="/" />
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg flex flex-col gap-8"
      >
        <LogoText className="text-4xl text-center" />

        <SignUpStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          status={status}
        />
        {getSignupFormContent(activeStep, destinationRef.current)}
        <>
          {activeStep === 2 ? (
            <Button
              size={"xl"}
              disabled={loading}
              type="submit"
              className="w-full"
            >
              {loading ? (
                <>
                  <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Verifying...
                </>
              ) : (
                <>Verify</>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={loading}
              type="button"
              size={"xl"}
            >
              {loading && <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" />}
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
