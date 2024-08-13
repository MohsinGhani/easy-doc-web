"use client";

import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
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
import { Icons } from "@/components/ui/icons";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Form } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";

// ConfirmResetPasswordForm component displays a form for confirming email
const ConfirmResetPasswordForm = () => {
  // Get the search params from the URL
  const searchParams = useSearchParams();
  // Get the dispatch function from the Redux store
  const dispatch = useAppDispatch();
  // Get the router object from Next.js
  const router = useRouter();

  // Get the loading state from the Redux store
  const { loading } = useAppSelector((state) => state.auth);

  // Get the email and destination from the search params
  const { email = "", destination = "" } = Object.fromEntries(searchParams);

  // Initialize the form with the ConfirmResetPassword schema
  const form = useForm<ConfirmResetPassword>({
    resolver: zodResolver(ConfirmResetPasswordSchema),
  });

  // Handle form submission
  const onSubmit = async ({
    confirmationCode,
    newPassword,
  }: ConfirmResetPassword) => {
    dispatch(
      authThunks.confirmPasswordReset({
        email,
        code: confirmationCode,
        newPassword,
        router,
      })
    );
  };

  // Render the form
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
                We Emailed You
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
                onClick={() =>
                  dispatch(
                    authThunks.requestPasswordReset({
                      email,
                      router,
                    })
                  )
                }
              >
                Resend Code
              </Button>
            </CardContent>

            <CardFooter className="pt-0">
              <Button className="w-full" disabled={loading} type="submit">
                {loading && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
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
