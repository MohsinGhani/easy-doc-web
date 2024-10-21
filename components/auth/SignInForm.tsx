"use client";

import { useAppSelector } from "@/lib/hooks";
import { UserSignin, UserSigninSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CardDescription } from "@/components/ui/card";
import { GoogleIcon, SpinnerIcon } from "@/components/ui/icons";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Form } from "@/components/ui/form";
import LogoText from "../LogoText";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const SignInForm = () => {
  const { signin } = useAuth();
  const { loading } = useAppSelector((state) => state.auth);

  const form = useForm<UserSignin>({
    resolver: zodResolver(UserSigninSchema),
  });

  const onSubmit = (values: UserSignin) => {
    signin(values);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-8"
        >
          <LogoText className="text-4xl text-center" />

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Welcome Back 👋</h1>
            <p className="text-muted-foreground">
              We are happy to have you back
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

          {/* Password */}
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Password"
          />

          <CardDescription className="self-end">
            <Link
              className="font-semibold text-primary hover:text-primary/80"
              href={"/auth/forgot-password"}
            >
              Forgot password?
            </Link>
          </CardDescription>

          <Button
            size={"xl"}
            disabled={loading}
            type="submit"
            className="w-full"
            loading={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>

          <Button
            size={"xl"}
            variant="outline"
            type="button"
            disabled={loading}
            loading={loading}
          >
            <GoogleIcon className="h-4 w-4" />
            <span className="ml-4">Sign in with Google</span>
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

export default SignInForm;
