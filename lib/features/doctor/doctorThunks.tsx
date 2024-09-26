import { calculateUpdatedRatings, functionsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateAuthState } from "../auth/authSlice";
import { RootState } from "@/lib/store";

// Fetch all doctors
const fetchAllDoctors = createAsyncThunk<User[]>(
  "doctor/fetchAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await functionsApiClient.get(
        "/doctors/all?profile_status=COMPLETED"
      );
      return response.data.data as User[];
    } catch (error: any) {
      // Extract error message from response or fallback to default
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting doctors, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch doctor by ID (check if the doctor already exists in the store)
const fetchDoctorById = createAsyncThunk<User, string>(
  "doctor/fetchDoctorById",
  async (doctorId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as {
        doctor: {
          fetchedDoctor?: User;
          allDoctors: User[];
        };
      };
      let doctor: User | null | undefined = null;
      doctor = state.doctor.allDoctors.find((d) => d.userId === doctorId);

      if (doctor) {
        return doctor;
      }

      doctor = state.doctor.fetchedDoctor;
      if (doctor && doctor.userId === doctorId) {
        return doctor;
      }

      const response = await functionsApiClient.get(
        `/doctors/${doctorId}?profile_status=COMPLETED`
      );
      return response.data.data as User;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting doctor, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit a review for a doctor
const submitDoctorReview = createAsyncThunk<
  Partial<User>,
  { reviewData: Review }
>(
  "doctor/submitDoctorReview",
  async ({ reviewData }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState() as RootState;

      const fetchedDoctor = state.doctor.fetchedDoctor;
      if (!fetchedDoctor) {
        return rejectWithValue("Doctor not found!");
      }

      const response = await functionsApiClient.post(
        `/doctor/${reviewData.doctorId}/reviews`,
        reviewData
      );

      const updatedData = calculateUpdatedRatings(
        reviewData.rating,
        fetchedDoctor.overallRating,
        fetchedDoctor.totalReviews,
        fetchedDoctor.ratingsBreakdownPercentages
      );

      return {
        ...fetchedDoctor,
        ...updatedData,
        reviews: [...fetchedDoctor.reviews, response.data.data],
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error submitting review, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// get all reviews of a doctor
const getDoctorReviews = createAsyncThunk<Partial<User>, { doctorId: string }>(
  "doctor/getDoctorReviews",
  async ({ doctorId }, { rejectWithValue }) => {
    try {
      const response = await functionsApiClient.get(
        `/doctor/${doctorId}/reviews`
      );
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting reviews, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Update doctor's profile
const updateDoctorProfile = createAsyncThunk<
  Partial<User>,
  { doctorId: string; updateData: Record<string, any> },
  { rejectValue: string }
>(
  "doctor/updateDoctorProfile",
  async ({ doctorId, updateData }, { rejectWithValue }) => {
    try {
      const response = await functionsApiClient.put(`/doctor/update`, {
        doctorId,
        updateData,
      });

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Export all thunks
export const doctorThunks = {
  fetchAllDoctors,
  fetchDoctorById,
  submitDoctorReview,
  updateDoctorProfile,
  getDoctorReviews,
};
