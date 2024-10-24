import { RootState } from "@/lib/store";
import { functionsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all favourites of the patient
const fetchAllFavourites = createAsyncThunk<{
  items: Favourite[];
  lastEvaluatedKey: string | null;
}>("favourite/fetchAllFavourites", async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const { userId } = state.auth.user;

    const response = await functionsApiClient.get(
      `/favourite/all?patientId=${userId}`
    );
    return response.data.data;
  } catch (error: any) {
    // Extract error message from response or fallback to default
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Error getting favourites, Pease try again!";
    return rejectWithValue(errorMessage);
  }
});

// Fetch all favourites with pagination
const fetchFavouritesByPagination = createAsyncThunk<
  { items: Favourite[]; lastEvaluatedKey: string | null },
  { startKey?: string | null; userId: string }
>(
  "favourite/fetchFavouritesByPagination",
  async (params, { rejectWithValue }) => {
    try {
      const { startKey = null, userId } = params;

      let url = `favourite/all?patientId=${userId}`;

      if (startKey) {
        url += `&startKey=${encodeURIComponent(startKey)}`;
      }

      const response = await functionsApiClient.get(url);

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting favourites, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// add a favourite to favourites
const addFavourite = createAsyncThunk<
  Favourite,
  { doctorId: string; patientId: string }
>(
  "favourite/addFavourite",
  async ({ doctorId, patientId }, { rejectWithValue }) => {
    try {
      const response = await functionsApiClient.post(
        `/favourite/add?patientId=${patientId}&doctorId=${doctorId}`
      );

      return response.data.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error adding favourite, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// remove a favourite from favourites
const removeFavourite = createAsyncThunk<
  string,
  { doctorId: string; patientId: string }
>(
  "favourite/removeFavourite",
  async ({ doctorId, patientId }, { rejectWithValue }) => {
    try {
      await functionsApiClient.delete(
        `/favourite/remove?doctorId=${doctorId}&patientId=${patientId}`
      );

      return doctorId;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error removing favourite, Please try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Export all thunks
export const favouriteThunks = {
  fetchAllFavourites,
  fetchFavouritesByPagination,
  addFavourite,
  removeFavourite,
};
