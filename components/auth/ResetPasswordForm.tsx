"use client";

import { useAppSelector } from "@/lib/hooks";
import { ResetPassword, ResetPasswordSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CardDescription } from "@/components/ui/card";
import { SpinnerIcon } from "@/components/ui/icons";
import { Form } from "@/components/ui/form";
import LogoText from "../LogoText";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ResetPasswordStepper } from "./Stepper";
import { Status } from "rc-steps/lib/interface";
import { useState } from "react";
import { getResetFormContent } from "@/helpers/getStepContent";

const ResetPasswordForm = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const { confirmResetPassword, resetPassword } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [status, setStatus] = useState<Status>("process");

  const form = useForm<ResetPassword>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async ({
    newPassword,
    confirmationCode,
    email,
  }: ResetPassword) => {
    const values = {
      code: confirmationCode,
      email,
      newPassword,
    };

    confirmResetPassword(values);
  };

  const handleNext = async () => {
    let keysToCheck: (keyof ResetPassword)[] = [];

    keysToCheck = ["email"] as const;

    const res = await form.trigger(keysToCheck);

    if (!res) {
      setStatus("error");
      return;
    }

    resetPassword(form.getValues());
    setActiveStep(activeStep + 1);
    setStatus("process");
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-8"
        >
          <LogoText className="text-4xl text-center" />

          <ResetPasswordStepper
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            status={status}
          />

          {getResetFormContent(activeStep)}

          {activeStep === 1 ? (
            <Button
              size={"xl"}
              disabled={loading}
              type="submit"
              className="w-full"
            >
              {loading ? (
                <>
                  <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" />{" "}
                  Resetting...
                </>
              ) : (
                <>Reset Password</>
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

          <CardDescription className="text-center">
            <span>Don&apos;t you have an account? </span>
            <Link
              className="font-semibold text-blue-500"
              href={"/auth/sign-up"}
            >
              Create an account
            </Link>
          </CardDescription>
          <CardDescription className="text-center">
            © Copyright 2024, All Rights Reserved by EasyDoc
          </CardDescription>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
