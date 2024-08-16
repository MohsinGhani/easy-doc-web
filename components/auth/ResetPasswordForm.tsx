"use client";

import { useAppSelector } from "@/lib/hooks";
import { ForgotPassword, ForgotPasswordSchema } from "@/models/User";
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

const ResetPasswordForm = () => {
  const { loading } = useAppSelector((state) => state.auth);
  const { resetPassword } = useAuth();

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = ({ email }: ForgotPassword) => {
    const values = {
      email,
    };

    resetPassword(values);
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
            <h1 className="text-2xl font-semibold">Reset Your Password</h1>
            <p className="text-muted-foreground">
              Enter your email and we&lsquo;ll send you a link to reset your
              password. Please check it.
            </p>
          </div>

          {/* EMAIL */}
          <CustomFormField
            fieldType={FormFieldType.EMAIL}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="ex: abc@example.com"
          />

          <CardDescription className="self-end">
            <Link
              className="font-semibold text-primary hover:text-primary/80"
              href={"/auth/sign-in"}
            >
              Back to Login?
            </Link>
          </CardDescription>

          <Button
            size={"xl"}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {loading && <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Loading..." : "Reset Password"}
          </Button>

          <CardDescription className="text-center">
            Don&apos;t you have an account?
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
