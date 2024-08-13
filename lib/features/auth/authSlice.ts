import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authThunks } from "./authThunks";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Define a type for the slice state
interface authState {
  user: {
    name: string;
    avatar: string;
    email: string;
    phone: string;
    role: string;
    userId: string;
  };
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: authState = {
  user: {
    name: "",
    avatar: "",
    email: "",
    phone: "",
    role: "",
    userId: "",
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
      const { payload: data } = action.payload;
      const user = {
        name: data.name,
        email: data.email,
        phone: data.phone_number,
        role: data["custom:role"],
        userId: data.sub,
      };

      Cookies.set("auth", JSON.stringify(user));

      Object.assign(state, {
        user,
        isLoggedIn: true,
      });
    },
    signout: (state) => {
      Object.assign(state, initialState);

      Cookies.remove("auth");
    },
    initializeAuthState: (state) => {
      const auth = Cookies.get("auth");
      if (auth) {
        const user = JSON.parse(auth);

        Object.assign(state, {
          user,
          isLoggedIn: true,
        });
      }
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
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )

      .addCase(authThunks.confirmCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.confirmCode.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.confirmCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
        }
      )

      .addCase(authThunks.resendConfirmationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.resendConfirmationCode.fulfilled, (state) => {
        Object.assign(state, initialState);
        state.loading = false;
      })
      .addCase(
        authThunks.resendConfirmationCode.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
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
          state.loading = false;
          toast.error(action.payload);
          state.error = action.payload;
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
          state.loading = false;
          state.error = action.payload;
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
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )
      
      .addCase(authThunks.confirmPasswordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authThunks.confirmPasswordReset.fulfilled, (state) => {
        state.loading = false;
        Object.assign(state, initialState);
      })
      .addCase(
        authThunks.confirmPasswordReset.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      );
  },
});

export const { signin, signout, initializeAuthState } = authSlice.actions;

export default authSlice.reducer;
