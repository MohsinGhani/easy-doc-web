"use client";

import { useAppSelector } from "@/lib/hooks";
import { UserSignup, UserSignupSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CardDescription } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { SpinnerIcon } from "@/components/ui/icons";
import { useRef, useState } from "react";
import LogoText from "../LogoText";
import Stepper from "./Stepper";
import { Status } from "rc-steps/lib/interface";
import { useAuth } from "@/hooks/useAuth";
import { getStepContent } from "@/helpers/getStepContent";
import SuccessPage from "./SuccessPage";

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
    setActiveStep(3);
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

      const values = {
        given_name,
        family_name,
        email,
        password,
        role,
        licence: role === "doctor" ? form.getValues().licence : "",
      };

      signup(values);
      destinationRef.current = email;
    }

    if (!error && !loading) {
      setActiveStep(activeStep + 1);
      setStatus("process");
    }
  };

  if (activeStep === 3) {
    return <SuccessPage />;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-lg flex flex-col gap-8"
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
                "Verify"
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
