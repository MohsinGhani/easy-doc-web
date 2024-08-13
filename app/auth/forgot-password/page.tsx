"use client";

import Link from "next/link";
import { ForgotPassword, ForgotPasswordSchema } from "@/models/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/auth/CustomFormField";
import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = ({ email }: ForgotPassword) => {
    dispatch(
      authThunks.requestPasswordReset({
        email,
        router,
      })
    );
  };

  return (
    <div className="pr-8 flex gap-5 justify-between items-start max-h-screen">
      <div className="w-[40%] h-full">
        <Image
          src={"/assets/images/register-img.png"}
          alt="forgot-password"
          width={1000}
          height={1000}
          className="h-screen w-full object-cover"
        />
      </div>

      <div className="w-[60%] flex flex-col space-y-6 justify-center mt-24">
        <div className="space-y-6">
          <h1 className="text-4xl text-primary font-extrabold">
            Reset Your Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email and we&lsquo;ll send you a link to reset your
            password. Please check it.
          </p>
        </div>

        <Form {...form}>
          <form
            className="flex gap-6 flex-col max-w-md"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* EMAIL */}
            <CustomFormField
              fieldType={FormFieldType.EMAIL}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="ex: abc@example.com"
            />

            <div className="flex items-center gap-2 justify-between self-end max-w-sm">
              <Link className="link text-sec" href={"/auth/sign-in"}>
                <Button variant="link">Back to Login</Button>
              </Link>

              <Button disabled={loading} type="submit">
                {loading && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                {loading ? "Sending..." : "Send Code"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
