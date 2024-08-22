import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import availabilityReducer from "./features/doctor/availabilitySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      sidebar: sidebarReducer,
      availability: availabilityReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
