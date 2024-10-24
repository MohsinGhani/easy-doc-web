import { createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { favouriteThunks } from "./favouriteThunks";

const initialState: favouriteState = {
  allFavourites: [],
  loading: false,
  error: null,
  lastEvaluatedKey: null,
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all favourites
      .addCase(favouriteThunks.fetchAllFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.allFavourites = [];
        state.lastEvaluatedKey = null;
      })
      .addCase(
        favouriteThunks.fetchAllFavourites.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allFavourites = items;
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(favouriteThunks.fetchAllFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error((action.payload as string) || "Failed to fetch favourites");
      })

      // Fetch all favourites with pagination
      .addCase(favouriteThunks.fetchFavouritesByPagination.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastEvaluatedKey = null;
      })
      .addCase(
        favouriteThunks.fetchFavouritesByPagination.fulfilled,
        (state, action) => {
          const { items, lastEvaluatedKey } = action.payload;
          state.allFavourites = [...state.allFavourites, ...items];
          state.lastEvaluatedKey = lastEvaluatedKey || null;

          state.loading = false;
        }
      )
      .addCase(
        favouriteThunks.fetchFavouritesByPagination.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          toast.error(
            (action.payload as string) || "Failed to fetch favourites"
          );
        }
      )

      // add a favourite to favourites
      .addCase(favouriteThunks.addFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(favouriteThunks.addFavourite.fulfilled, (state, action) => {
        state.allFavourites.push(action.payload);
        state.loading = false;
      })
      .addCase(favouriteThunks.addFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error((action.payload as string) || "Failed to add favourite");
      })

      // remove a favourite from favourites
      .addCase(favouriteThunks.removeFavourite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(favouriteThunks.removeFavourite.fulfilled, (state, action) => {
        state.allFavourites = state.allFavourites.filter(
          (favourite) => favourite.favouriteId !== action.payload
        );
        state.loading = false;
      })
      .addCase(favouriteThunks.removeFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        toast.error((action.payload as string) || "Failed to remove favourite");
      });
  },
});

export const {} = favouriteSlice.actions;

export default favouriteSlice.reducer;
