import { createAsyncThunk } from "@reduxjs/toolkit";
import { signin as signinAction, signout as signoutAction } from "./authSlice";
import { toast } from "sonner";
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  fetchAuthSession,
} from "aws-amplify/auth";
import {
  ConfirmCodePayload,
  ConfirmResetPasswordPayload,
  ResendConfirmationCodePayload,
  ResetPasswordPayload,
  SigninPayload,
  SignupPayload,
} from "@/types/auth";
import Cookies from "js-cookie";
import { functionsApiClient } from "@/lib/utils";

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
              picture: `https://avatar.iran.liara.run/public/${Math.floor(
                Math.random() * 100
              )}`,
              "custom:role": role,
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
        const { nextStep } = await confirmSignUp({
          username: values.email,
          confirmationCode: values.confirmationCode,
        });

        switch (nextStep.signUpStep) {
          case "DONE":
            if (!values.password) {
              toast.success(
                "Email verification successful!, you can sign in now"
              );
              router.push("/auth/sign-in");
              return;
            }

            const { isSignedIn, nextStep } = await signIn({
              username: values.email,
              password: values.password,
            });

            break;

          case "CONFIRM_SIGN_UP":
            router.push("/auth/verify-email?email=" + values.email);
            return rejectWithValue("Please verify your email first!");

          case "COMPLETE_AUTO_SIGN_IN":
            toast.success("Sign in successful!, you'll be redirected shortly");

            const payload = (await fetchAuthSession()).tokens?.idToken?.payload;

            if (!payload) {
              return rejectWithValue("Sign-in failed. Please try again.");
            }

            dispatch(signinAction({ payload }));

            const role = payload["custom:role"];
            router.push(
              role === "doctor"
                ? `/dashboard`
                : role === "admin"
                ? `/admin`
                : `/doctors`
            );
            break;

          default:
            break;
        }

        const payload = (await fetchAuthSession()).tokens?.idToken?.payload;

        if (!payload) {
          return rejectWithValue("Sign-in failed. Please try again.");
        }

        dispatch(signinAction({ payload }));

        toast.success("Sign in successful!, you'll be redirected shortly");
        const role = payload["custom:role"];

        router.push(
          role === "doctor" ? `/dashboard` : role === "admin" ? `/admin` : `/`
        );
      } catch (error: any) {
        return rejectWithValue(error.message || "Something went wrong");
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

        const payload = (await fetchAuthSession()).tokens?.idToken?.payload;

        if (!payload) {
          return rejectWithValue("Sign-in failed. Please try again.");
        }

        dispatch(signinAction({ payload }));
        await dispatch(authThunks.initializeAuth());

        const role = payload["custom:role"];
        toast.success("Sign in successful!");
        router.push(
          role === "doctor" ? `/dashboard` : role === "admin" ? `/admin` : `/`
        );
      } catch (error: any) {
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

        dispatch(signoutAction());
        toast.success("Logged out Successfully");
        router.push("/auth/sign-in");
      } catch (error: any) {
        return rejectWithValue(error.message || "Error signing out, Please try again!");
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
        const nextStep = await resendSignUpCode({ username: values.email });

        const { attributeName, deliveryMedium, destination } = nextStep;

        toast.success("Code sent successfully");
      } catch (error: any) {
        return rejectWithValue(error.message || "Error Sending Confirmation code, Pease try again!");
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
        return rejectWithValue(error.message || "Error in sending code, Pease try again!");
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
        return rejectWithValue(error.message || "Error changing password, Pease try again!");
      }
    }
  ),

  initializeAuth: createAsyncThunk(
    "auth/fetchUserDetails",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const userId = Cookies.get("userId");
        const auth = Cookies.get("auth");

        // TODO: instead of using userId, get the userId from cognito Cookie
        if (!userId && !auth) {
          // console.log("No user ID or auth found");

          await signOut();
          dispatch(signoutAction());

          return rejectWithValue("No user ID or auth found");
        }

        if (auth) {
          const parsedAuth = JSON.parse(auth) as User;
          return parsedAuth;
        } else if (userId) {
          const response = await functionsApiClient.get(`/auth/${userId}`);
          return response.data.data;
        }
      } catch (error) {
        await signOut();
        dispatch(signoutAction());

        return rejectWithValue("Error in confirming your identity, Pease signin again!");
      }
    }
  ),

  updateProfile: createAsyncThunk<
    Partial<User>,
    { userId: string; updateData: Record<string, any> },
    { rejectValue: string }
  >(
    "auth/updateProfile",
    async ({ userId, updateData }, { getState, rejectWithValue }) => {
      debugger;
      try {
        const state = getState() as { auth: { user?: { role?: string } } };
        const role = state.auth.user?.role;

        type params = {
          updateData: Record<string, any>;
          userId: string;
          doctorId?: string;
        };

        const params: params = {
          updateData,
          userId,
        };

        if (role === "doctor") {
          params.doctorId = userId;
        }

        const response = await functionsApiClient.put(
          `/${role === "doctor" ? "doctor" : "auth"}/update`,
          params
        );

        return response.data.data;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to update profile, Please try again!";
        return rejectWithValue(errorMessage);
      }
    }
  ),
};
