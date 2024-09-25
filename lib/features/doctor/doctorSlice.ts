import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { doctorThunks } from "./doctorThunks";

const initialState: doctorState = {
  allDoctors: [],
  fetchedDoctor: null,
  loading: false,
  error: null,
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearFetchedDoctor: (state) => {
      state.fetchedDoctor = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all doctors
    builder
      .addCase(doctorThunks.fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        doctorThunks.fetchAllDoctors.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.allDoctors = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        doctorThunks.fetchAllDoctors.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch doctors");
        }
      )

      // Fetch doctor by ID
      .addCase(doctorThunks.fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        doctorThunks.fetchDoctorById.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.fetchedDoctor = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        doctorThunks.fetchDoctorById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch doctor details");
        }
      )

      // Submit doctor review
      .addCase(doctorThunks.submitDoctorReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        doctorThunks.submitDoctorReview.fulfilled,
        (state, action: PayloadAction<Partial<User>>) => {
          if (state.fetchedDoctor) {
            state.fetchedDoctor = {
              ...state.fetchedDoctor,
              ...action.payload,
            };
          }
          state.loading = false;
          toast.success("Review submitted successfully!");
        }
      )
      .addCase(
        doctorThunks.submitDoctorReview.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to submit review");
        }
      )

      // Update doctor profile
      .addCase(doctorThunks.updateDoctorProfile.pending, (state) => {
        debugger;
        state.loading = true;
        state.error = null;
      })
      .addCase(
        doctorThunks.updateDoctorProfile.fulfilled,
        (state, action: PayloadAction<Partial<User>>) => {
          if (state.fetchedDoctor) {
            state.fetchedDoctor = {
              ...state.fetchedDoctor,
              ...action.payload,
            };
          }
          state.loading = false;
          toast.success("Profile updated successfully!");
        }
      )
      .addCase(
        doctorThunks.updateDoctorProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to update profile");
        }
      );
  },
});

export const { clearFetchedDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
