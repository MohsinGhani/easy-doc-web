import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "./authThunks";
import Cookies from "js-cookie";
import { toast } from "sonner";

const initialState: authState = {
  user: {
    userId: "",
    given_name: "",
    family_name: "",
    display_name: "",
    picture: "",
    email: "",
    role: "",
    bio: "",
    city: "",
    country: "",
    location: "",
    years_of_experience: "",
    verified: 0,
    available: false,
    average_fee: 0,
    awards: [],
    availableDays: [],
    education: [],
    experiences: [],
    overallRating: 0,
    reviews: [],
    designation: "",
    dob: "",
    gender: "N/D",
    languages: [],
    phone_number: "",
    services: [],
    profile_completion: 0,
    profile_status: "INCOMPLETE",
    ratingsBreakdownPercentages: [],
    createdAt: "",
    licence: "",
    updatedAt: "",
    totalReviews: 0,
    stripeAccountId: "",
    stripe_account_active: false,
    no_of_appointments: 0,
    address: "",
    state: "",
    zip_code: "",
    age: 0,
    blood_group: "",
  },
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<any>) => {
      const { payload } = action.payload;

      const user: Partial<User> = {
        given_name: payload.given_name,
        family_name: payload.family_name,
        email: payload.email,
        role: payload["custom:role"],
        verified: payload["custom:role"] === "doctor" ? 0 : 1,
        userId: payload.sub,
      };

      Cookies.set("userId", user.userId || "");

      state.isLoggedIn = true;
      state.user = { ...state.user, ...user } as User;
    },
    signout: (state) => {
      Object.assign(state, initialState);

      Cookies.remove("userId");
      Cookies.remove("auth");
    },
    updateAuthState: (state, action: PayloadAction<Partial<authState>>) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authThunks.signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.signup.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.signup.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.confirmCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.confirmCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.confirmCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.resendConfirmationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.resendConfirmationCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.resendConfirmationCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.signin.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.signin.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.signout.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.signout.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.requestPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.requestPasswordReset.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(
        authThunks.requestPasswordReset.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.confirmPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.confirmPasswordReset.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.confirmPasswordReset.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.initializeAuth.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoggedIn = true;
          state.user = action.payload;
          !Cookies.get("auth") &&
            Cookies.set("auth", JSON.stringify(action.payload), {
              expires: 1 / 24, // 1 hour
            });
          state.loading = false;
        }
      )
      .addCase(
        authThunks.initializeAuth.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload ?? "Failed to initialize auth";
          action.payload && toast.error(action.payload);
        }
      )

      .addCase(authThunks.updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.updateProfile.fulfilled,
        (state, action: PayloadAction<Partial<User>>) => {
          if (state.user) {
            state.user = {
              ...state.user,
              ...action.payload,
            };
          }
          if (Cookies.get("auth")) {
            Cookies.set(
              "auth",
              JSON.stringify({
                ...state.user,
                ...action.payload,
              }),
              {
                expires: 1 / 24,
              }
            );
          }
          state.loading = false;
          toast.success("Profile updated successfully!");
        }
      )
      .addCase(
        authThunks.updateProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to update profile");
        }
      )

      .addCase(authThunks.connectStripeAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.connectStripeAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          window.location.href = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        authThunks.connectStripeAccount.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          toast.error(action.payload);
        }
      )

      .addCase(authThunks.verifyStripeAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authThunks.verifyStripeAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user.stripe_account_active = action.payload;
          if (Cookies.get("auth")) {
            Cookies.set(
              "auth",
              JSON.stringify({
                ...state.user,
                stripe_account_active: action.payload,
              }),
              {
                expires: 1 / 24,
              }
            );
          }
          state.loading = false;
        }
      )
      .addCase(
        authThunks.verifyStripeAccount.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
          // toast.error(action.payload);
        }
      );
  },
});

export const { signin, signout, updateAuthState } = authSlice.actions;

export default authSlice.reducer;
