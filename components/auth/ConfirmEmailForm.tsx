"use client";

import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { ConfirmCode, ConfirmCodeSchema } from "@/models/User";
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
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// ConfirmEmailForm component displays a form for confirming email
const ConfirmEmailForm = () => {
  // Get the search params from the URL
  const searchParams = useSearchParams();
  // Get the dispatch function from the Redux store
  const dispatch = useAppDispatch();
  // Get the router object from Next.js
  const router = useRouter();

  // Get the loading state from the Redux store
  const { loading } = useAppSelector((state) => state.auth);

  // Initialize the email and destination refs
  const emailRef = useRef("");
  const destinationRef = useRef("");

  // Update the email and destination refs with the search params
  useEffect(() => {
    emailRef.current = searchParams.get("email") || "";
    destinationRef.current = searchParams.get("destination") || "";
  }, [searchParams]);

  // Initialize the form with the ConfirmCode schema
  const form = useForm<ConfirmCode>({
    resolver: zodResolver(ConfirmCodeSchema),
  });

  // Handle form submission
  const onSubmit = async ({ confirmationCode }: ConfirmCode) => {
    // Dispatch the confirmCode action with the form values and router object
    dispatch(
      authThunks.confirmCode({
        values: { confirmationCode, email: emailRef.current },
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
                <h1 className="text-2xl">We Emailed You</h1>
                <p className="text-gray-500">
                  Your code is on the way. To log in, enter the code we emailed
                  to {destinationRef.current}. It may take a minute to arrive.
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

              <Button
                className="ml-auto w-fit"
                variant={"link"}
                onClick={() =>
                  dispatch(
                    authThunks.resendConfirmationCode({
                      values: { email: emailRef.current },
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
                {loading ? "Confirming..." : "Confirm"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmEmailForm;
