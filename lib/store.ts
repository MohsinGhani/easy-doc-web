import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import doctorReducer from "./features/doctor/doctorSlice";
import appointmentReducer from "./features/appointment/appointmentSlice";
import paymentReducer from "./features/payment/paymentSlice";
import notificationReducer from "./features/notification/notificationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      sidebar: sidebarReducer,
      doctor: doctorReducer,
      appointment: appointmentReducer,
      payment: paymentReducer,
      notification: notificationReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
