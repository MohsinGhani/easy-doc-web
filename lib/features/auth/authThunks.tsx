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

        const { nextStep } = await signUp({
          username: email,
          password: password,
          options: {
            userAttributes: {
              given_name,
              family_name,
              email,
              "custom:role": role,
              "custom:verified": role === "doctor" ? "false" : "true",
              "custom:licence": role === "doctor" ? licence : "",
            },
          },
        });

        const { codeDeliveryDetails }: any = nextStep;

        Cookies.set("auth", JSON.stringify({ email }));

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

        if (!values.password) {
          toast.success("Email verification successful!, you can sign in now");
          router.push("/auth/sign-in");
          return;
        }

        await signIn({
          username: values.email,
          password: values.password,
        });

        const { userId } = await getCurrentUser();
        const payload = handleTokenStorage(userId);
        dispatch(signinAction({ payload }));
        toast.success("Sign in successful!, you'll be redirected shortly");
        const role = payload["custom:role"];

        router.push(
          role === "doctor" ? `/dashboard` : role === "admin" ? `/admin` : `/`
        );
      } catch (error: any) {
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
        const { nextStep } = await signIn({
          username: values.email,
          password: values.password,
        });

        if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          router.push("/auth/verify-email?email=" + values.email);
          return rejectWithValue("Please verify your email first!");
        }


        const { userId } = await getCurrentUser();
        const payload = handleTokenStorage(userId);

        dispatch(signinAction({ payload }));

        const role = payload["custom:role"];
        toast.success("Sign in successful!");
        router.push(
          role === "doctor" ? `/dashboard` : role === "admin" ? `/admin` : `/`
        );
      } catch (error: any) {
        console.log(error.message);
        const errorType =
          error.__type || error.code || error.name || error.message || error;

        if (errorType === "NotAuthorizedException") {
          return rejectWithValue("Incorrect username or password!");
        } else if (
          errorType === "UserNotFoundException" ||
          errorType === "User does not exist."
        ) {
          return rejectWithValue("User does not exist.");
        }

        return rejectWithValue("Sign-in failed. Please try again.");
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
      { values }: { values: ResetPasswordPayload },
      { rejectWithValue }
    ) => {
      try {
        const { email } = values;
        resetPassword({ username: email });
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
