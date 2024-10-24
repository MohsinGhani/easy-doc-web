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
import Cookies from "js-cookie";
import { functionsApiClient } from "@/lib/utils";
import { RootState } from "@/lib/store";

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
        return rejectWithValue(
          error.message || "Error signing out, Please try again!"
        );
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
        return rejectWithValue(
          error.message || "Error Sending Confirmation code, Pease try again!"
        );
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
        return rejectWithValue(
          error.message || "Error in sending code, Pease try again!"
        );
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
        return rejectWithValue(
          error.message || "Error changing password, Pease try again!"
        );
      }
    }
  ),

  initializeAuth: createAsyncThunk(
    "auth/fetchUserDetails",
    async (_, { rejectWithValue, dispatch }) => {
      try {
        const userId = Cookies.get("userId");
        const auth = Cookies.get("auth");

        // Check if auth exists and is not undefined
        if (auth && auth !== "undefined") {
          try {
            // Attempt to parse auth JSON safely
            const parsedAuth = JSON.parse(auth) as User;
            return parsedAuth;
          } catch (parseError) {
            if (userId) {
              const response = await functionsApiClient.get(`/auth/${userId}`);
              return response.data.data as User;
            } else {
              await signOut();
              dispatch(signoutAction());
              return rejectWithValue(
                "Invalid authentication data, please sign in again."
              );
            }
          }
        }

        // If no auth but userId exists, fetch user details
        else if (userId) {
          const response = await functionsApiClient.get(`/auth/${userId}`);
          return response.data.data as User;
        }
      } catch (error) {
        await signOut();
        dispatch(signoutAction());
        return rejectWithValue(
          "Error in confirming your identity, please sign in again!"
        );
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
          role?: string;
        };

        const params: params = {
          updateData,
          userId,
          role,
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

  connectStripeAccount: createAsyncThunk<
    { accountId: string; accountLink: string }, // Return type
    { userId: string; email: string; stripeAccountId?: string }, // Parameters to the action
    { rejectValue: string; state: RootState } // Additional options
  >(
    "auth/connectStripeAccount",
    async (
      { userId, email, stripeAccountId },
      { getState, rejectWithValue }
    ) => {
      try {
        // Get the user's role from the state (optional, based on your use case)
        const state = getState();
        const role = state.auth.user?.role;

        if (!role || role !== "doctor") {
          // Optional role check if you want to restrict this action to doctors only
          return rejectWithValue("Only doctors can connect a Stripe account.");
        }

        // Make an API call to the backend to create the Stripe account
        const response = await functionsApiClient.post(
          "/connect-stripe-account",
          {
            email,
            doctorId: userId, // Use userId as doctorId for Stripe onboarding
            stripeAccountId, // Optional: Use existing Stripe account ID if available
          }
        );

        // Return the accountId and accountLink from the response
        return response.data.data.accountLink;
      } catch (error: any) {
        // Handle errors gracefully and return a meaningful error message
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to connect Stripe account. Please try again!";
        return rejectWithValue(errorMessage);
      }
    }
  ),

  verifyStripeAccount: createAsyncThunk<
    { isActive: boolean; status: string; capabilities: any }, // Return type
    { doctorId: string }, // Parameters to the action
    { rejectValue: string }
  >("auth/verifyStripeAccount", async ({ doctorId }, { rejectWithValue }) => {
    try {
      // Make an API call to the backend to verify the Stripe account
      const response = await functionsApiClient.post(
        `/verify-stripe-account?doctorId=${doctorId}`
      );

      // Return the verification details from the response
      return response.data.data.status;
    } catch (error: any) {
      // Handle errors gracefully and return a meaningful error message
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify Stripe account. Please try again!";
      return rejectWithValue(errorMessage);
    }
  }),
};
