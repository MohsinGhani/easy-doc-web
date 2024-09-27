import { RootState } from "@/lib/store";
import { paymentsApiClient } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all payments
const fetchAllPayments = createAsyncThunk<Payment[]>(
  "payment/fetchAllPayments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const { role, userId } = state.auth.user;

      const response = await paymentsApiClient.get(
        `/payments/all?status=COMPLETED&limit=10&role=${role}&userId=${userId}`
      );
      return response.data.data as Payment[];
    } catch (error: any) {
      // Extract error message from response or fallback to default
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting payments, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch payment by ID (check if the payment already exists in the store)
const fetchPaymentById = createAsyncThunk<Payment, string>(
  "payment/fetchPaymentById",
  async (paymentId, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;

      let payment: Payment | null | undefined = null;
      payment = state.payment.allPayments.find(
        (p) => p.paymentId === paymentId
      );

      if (payment) {
        return payment;
      }

      payment = state.payment.fetchedPayment;
      if (payment && payment.paymentId === paymentId) {
        return payment;
      }

      const response = await paymentsApiClient.get(
        `/payments/${paymentId}?status=COMPLETED`
      );
      return response.data.data as Payment;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error getting payment, Pease try again!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const paymentThunks = {
  fetchAllPayments,
  fetchPaymentById,
};
