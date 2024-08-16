"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { signin as signinAction, signout as signoutAction } from "./authSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resendSignUpCode,
  decodeJWT,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
} from "aws-amplify/auth";
import {
  ConfirmCodePayload,
  ConfirmResetPasswordPayload,
  ResendConfirmationCodePayload,
  ResetPasswordPayload,
  SigninPayload,
  SignupPayload,
} from "@/types/auth";
import { handleTokenStorage } from "@/helpers/auth";

export const authThunks = {
  signup: createAsyncThunk(
    "auth/signup",
    async ({ values }: { values: SignupPayload }, { rejectWithValue }) => {
      try {
        const { email, password, given_name, family_name, role, licence } =
          values;

        // const displayName = `${role === "doctor" ? "Dr. " : ""}${given_name}`;

        const { nextStep } = await signUp({
          username: email,
          password: password,
          options: {
            userAttributes: {
              given_name,
              family_name,
              email,
              "custom:role": role,
              // "custom:displayName": displayName,
              "custom:verified": role === "doctor" ? "false" : "true",
              "custom:licence": role === "doctor" ? licence : "",
            },
          },
        });

        const { codeDeliveryDetails }: any = nextStep;

        return codeDeliveryDetails;
      } catch (error: any) {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  ),

  confirmCode: createAsyncThunk(
    "auth/confirmCode",
    async (
      { values, router }: { values: ConfirmCodePayload; router: any },
      { rejectWithValue, dispatch }
    ) => {
      try {
        await confirmSignUp({
          username: values.email,
          confirmationCode: values.confirmationCode,
        });

        await signIn({
          username: values.email,
          password: values.password,
        });

        const { userId } = await getCurrentUser();
        const payload = handleTokenStorage(userId);

        dispatch(signinAction({ payload }));
        toast.success("Sign in successful!, you'll be redirected shortly");

        setTimeout(() => {
          router.push(`/`);
        }, 2000);
      } catch (error: any) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  ),

  signin: createAsyncThunk(
    "auth/signin",
    async (
      { values, router }: { values: SigninPayload; router: any },
      { rejectWithValue, dispatch }
    ) => {
      try {
        await signIn({
          username: values.email,
          password: values.password,
        });

        const { userId } = await getCurrentUser();
        const payload = handleTokenStorage(userId);

        dispatch(signinAction({ payload }));

        toast.success("Sign in successful!");
        router.push(`/`);
      } catch (error: any) {
        toast.error(
          error._type === "UserNotConfirmedException"
            ? "Please confirm your email"
            : "Sign in failed!"
        );
        return rejectWithValue(error.message);
      }
    }
  ),

  signout: createAsyncThunk(
    "auth/signout",
    async (router: any, { rejectWithValue, dispatch }) => {
      try {
        await signOut();
        Cookies.remove("token");

        dispatch(signoutAction());
        toast.success("Logged out Successfully");
        router.push("/auth/sign-in");
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  ),

  resendConfirmationCode: createAsyncThunk(
    "auth/resendConfirmationCode",
    async (
      { values }: { values: ResendConfirmationCodePayload },
      { rejectWithValue }
    ) => {
      try {
        await resendSignUpCode({ username: values.email });
        toast.success("Code sent successfully");
      } catch (error: any) {
        toast.error(error.message);
        return rejectWithValue(error.message);
      }
    }
  ),

  requestPasswordReset: createAsyncThunk(
    "auth/requestPasswordReset",
    async (
      { values, router }: { values: ResetPasswordPayload; router: any },
      { rejectWithValue }
    ) => {
      try {
        const { email } = values;
        const { nextStep } = await resetPassword({ username: email });
        router.push(
          `/auth/confirm-password-reset?email=${email}&destination=${nextStep.codeDeliveryDetails.destination}`
        );
        toast.success("Code sent successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to request password reset.");
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  ),

  confirmPasswordReset: createAsyncThunk(
    "auth/confirmPasswordReset",
    async (
      { values, router }: { values: ConfirmResetPasswordPayload; router: any },
      { rejectWithValue }
    ) => {
      try {
        const { email, code, newPassword } = values;
        await confirmResetPassword({
          username: email,
          confirmationCode: code,
          newPassword: newPassword,
        });

        toast.success("Password reset successful!");
        router.push("/auth/sign-in");
      } catch (error: any) {
        toast.error(error.message || "Failed to reset password.");
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  ),
};
