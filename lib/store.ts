import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import sidebarReducer from "./features/sidebar/sidebarSlice";
import patientReducer from "./features/patient/patientSlice";
import doctorReducer from "./features/doctor/doctorSlice";
import dropdownReducer from "./features/common/dropdownSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      sidebar: sidebarReducer,
      patient: patientReducer,
      doctor: doctorReducer,
      dropdown: dropdownReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
