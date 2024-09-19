import apiClient from "@/helpers/apiClient";
import { RootState } from "@/lib/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all doctors
const fetchAllDoctors = createAsyncThunk<Doctor[]>(
  "doctor/fetchAllDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/doctors/all");
      return response.data.data as Doctor[];
    } catch (error: any) {
      // Extract error message from response or fallback to default
      const errorMessage =
        error.response?.data?.message || error.message || "Network error";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch doctor by ID (check if the doctor already exists in the store)
const fetchDoctorById = createAsyncThunk<Doctor, string>(
  "doctor/fetchDoctorById",
  async (doctorId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const existingDoctor = state.doctor.allDoctors.find(
        (doc) => doc.userId === doctorId
      );
      if (existingDoctor) {
        return existingDoctor;
      }

      const response = await apiClient.get(`/doctor/${doctorId}`);
      return response.data.data as Doctor;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Network error";
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit a review for a doctor
export const submitDoctorReview = createAsyncThunk<
  Partial<Doctor>,
  { reviewData: any }
>("doctor/submitDoctorReview", async ({ reviewData }, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(`/doctor/review`, reviewData);
    return response.data.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error submitting review";
    return rejectWithValue(errorMessage);
  }
});

// Update doctor's profile
export const updateDoctorProfile = createAsyncThunk<
  Partial<Doctor>,
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
};
