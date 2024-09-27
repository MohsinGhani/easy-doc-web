import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { paymentThunks } from "./paymentThunks";

const initialState: paymentState = {
  allPayments: [],
  fetchedPayment: null,
  loading: false,
  error: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all payments
      .addCase(paymentThunks.fetchAllPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        paymentThunks.fetchAllPayments.fulfilled,
        (state, action: PayloadAction<Payment[]>) => {
          state.allPayments = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        paymentThunks.fetchAllPayments.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch payment details");
        }
      )

      // Fetch payment by ID
      .addCase(paymentThunks.fetchPaymentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        paymentThunks.fetchPaymentById.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.fetchedPayment = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        paymentThunks.fetchPaymentById.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload || "Failed to fetch payment details");
        }
      );
  },
});

export const {} = paymentSlice.actions;

export default paymentSlice.reducer;
