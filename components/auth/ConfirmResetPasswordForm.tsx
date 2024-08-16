"use client";

import { useAppSelector } from "@/lib/hooks";
import {
  ConfirmResetPassword,
  ConfirmResetPasswordSchema,
} from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Form } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { SpinnerIcon } from "../ui/icons";
import { useAuth } from "@/hooks/useAuth";

const ConfirmResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const { confirmResetPassword, resetPassword } = useAuth();

  const { loading } = useAppSelector((state) => state.auth);

  const { email = "", destination = "" } = Object.fromEntries(searchParams);

  const form = useForm<ConfirmResetPassword>({
    resolver: zodResolver(ConfirmResetPasswordSchema),
  });

  const resendResetPasswordCode = async () => {
    const values = {
      email,
    };

    resetPassword(values);
  };

  const onSubmit = async ({
    newPassword,
    confirmationCode,
  }: ConfirmResetPassword) => {
    const values = {
      code: confirmationCode,
      email,
      newPassword,
    };

    confirmResetPassword(values);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md"
        >
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="space-y-4">
                <span>We Emailed You</span>
                <p className="text-gray-500">
                  Your code is on the way. To log in, enter the code we emailed
                  to {destination}. It may take a minute to arrive.
                </p>
              </CardTitle>
            </CardHeader>

            <CardContent className="grid gap-4">
              {/* Confirmation Code Field */}
              <CustomFormField
                fieldType={FormFieldType.NUMBER}
                control={form.control}
                name="confirmationCode"
                label="Confirmation Code"
              />

              {/* Password */}
              <CustomFormField
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="newPassword"
                label="New Password"
              />

              {/* Confirm Password */}
              <CustomFormField
                fieldType={FormFieldType.PASSWORD}
                control={form.control}
                name="confirmPassword"
                label="Confirm New Password"
              />

              <Button
                className="ml-auto w-fit"
                variant={"link"}
                onClick={resendResetPasswordCode}
                type="button"
              >
                Resend Code
              </Button>
            </CardContent>

            <CardFooter className="pt-0">
              <Button className="w-full" disabled={loading} type="submit">
                {loading && (
                  <SpinnerIcon className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                {loading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmResetPasswordForm;
