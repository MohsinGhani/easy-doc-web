"use client";

import { ConfirmCode, ConfirmCodeSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CardDescription } from "@/components/ui/card";
import { SpinnerIcon } from "@/components/ui/icons";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Form } from "@/components/ui/form";
import LogoText from "../LogoText";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useDelayedButton } from "@/hooks/useDelayedButton";
import { useAppSelector } from "@/lib/hooks";

const VerifyEmailForm = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const { resendConfirmationCode, confirmCode } = useAuth();
  const { searchParams } = new URL(window.location.href);
  const email = searchParams.get("email") || "";
  const isEnabled = useDelayedButton(60000);

  useEffect(() => {
    resendConfirmationCode({ email });
  }, []);

  const form = useForm<ConfirmCode>({
    resolver: zodResolver(ConfirmCodeSchema),
  });

  const onSubmit = ({ confirmationCode }: ConfirmCode) => {
    const values = {
      email,
      confirmationCode,
    };

    confirmCode(values);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-8"
        >
          <LogoText className="text-4xl text-center" />

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Verify Your Email</h1>
            <p className="text-muted-foreground">
              Enter the code that we sent to <strong>{email}</strong>
            </p>
          </div>

          {/* OTP */}
          <CustomFormField
            fieldType={FormFieldType.INPUT_OTP}
            control={form.control}
            name="confirmationCode"
          />

          <CardDescription className="self-end">
            <Button
              disabled={!isEnabled || loading}
              onClick={() => resendConfirmationCode({ email })}
              className="font-semibold text-primary hover:text-primary/80"
              variant={"link"}
            >
              Resend OTP?
            </Button>
          </CardDescription>

          <Button
            size={"xl"}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {loading && <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Verifying..." : "Verify Email"}
          </Button>

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

export default VerifyEmailForm;
