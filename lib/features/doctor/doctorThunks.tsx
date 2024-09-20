import apiClient from "@/helpers/apiClient";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all doctors
const fetchAllDoctors = createAsyncThunk<User[]>(
  "doctor/fetchAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/doctors/all");
      return response.data.data as User[];
    } catch (error: any) {
      // Extract error message from response or fallback to default
      const errorMessage =
        error.response?.data?.message || error.message || "Network error";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch doctor by ID (check if the doctor already exists in the store)
const fetchDoctorById = createAsyncThunk<User, string>(
  "doctor/fetchDoctorById",
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/doctors/${doctorId}`);
      return response.data.data as User;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Network error";
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit a review for a doctor
const submitDoctorReview = createAsyncThunk<
  Partial<User>,
  { reviewData: Review }
>("doctor/submitDoctorReview", async ({ reviewData }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(
      `/doctors/${reviewData.doctorId}/reviews`,
      reviewData
    );
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error submitting review";
    return rejectWithValue(errorMessage);
  }
});

// Submit a review for a doctor
const getDoctorReviews = createAsyncThunk<Partial<User>, { doctorId: string }>(
  "doctor/getDoctorReviews",
  async ({ doctorId }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/doctors/${doctorId}/reviews`);
      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error submitting review";
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
      const response = await apiClient.put(`/doctor/update`, {
        doctorId,
        updateData,
      });

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update profile";
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
