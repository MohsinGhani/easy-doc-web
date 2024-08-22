import { z } from "zod";

export const UserSignupSchema = z
  .object({
    given_name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    family_name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .refine(
        (val: string) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
            val
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        }
      ),
    confirmPassword: z
      .string({
        required_error: "Confirm password is required",
      })
      .trim()
      .min(1),
    role: z.enum(["doctor", "patient"]),
    confirmationCode: z.string().trim().min(6).max(6),
    licence: z
      .string()
      .trim()
      .min(6)
      .max(6)
      .refine((val: string) => /^[A-Z]{2}[0-9]{4}$/.test(val), {
        message: "Licence must be in format: AA1234",
      })
      .optional(),
  })
  .refine(
    (data: { password: string; confirmPassword: string }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );

export const UserSigninSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .refine(
      (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{6,20}$/.test(
          val
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});

export const ConfirmCodeSchema = z.object({
  confirmationCode: z
    .string()
    .trim()
    .min(6, { message: "Code must be at least 6 characters long" })
    .max(6, { message: "Code must be exactly 6 characters long" }),
});

export const ResetPasswordSchema = z
  .object({
    confirmationCode: z.string().min(1, "Confirmation code is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email.includes("@"), {
    message: "Invalid email address",
    path: ["email"],
  });

export type UserSignup = z.infer<typeof UserSignupSchema>;
export type ConfirmCode = z.infer<typeof ConfirmCodeSchema>;
export type UserSignin = z.infer<typeof UserSigninSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
