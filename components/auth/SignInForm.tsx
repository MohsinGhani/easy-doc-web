"use client";

import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { UserSignin, UserSigninSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CardDescription } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { Form } from "@/components/ui/form";
import LogoText from "../LogoText";
import CustomButton from "./CustomButton";

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const form = useForm<UserSignin>({
    resolver: zodResolver(UserSigninSchema),
  });

  const onSubmit = ({ email, password }: UserSignin) => {
    dispatch(
      authThunks.signin({
        values: { email, password },
        router,
      })
    );
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-8 pt-[52px] "
        >
          <LogoText className="text-4xl" />

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
              className="font-semibold text-blue-500"
              href={"/auth/forgot-password"}
            >
              Forgot password?
            </Link>
          </CardDescription>

          <CustomButton loading={loading} type="submit" className="w-full">
            {loading && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? "Loading..." : "Login"}
          </CustomButton>

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

          <CustomButton variant="outline" type="button" disabled={loading}>
            {loading ? (
              <Icons.spinner className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="h-4 w-4" />
            )}
            {"    "}
            <span className="ml-4">Sign in with Google</span>
          </CustomButton>

          <CardDescription className="text-center">
            Don&apos;t you have an account?
            <Link
              className="font-semibold text-blue-500"
              href={"/auth/sign-in"}
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
