import { createSlice } from "@reduxjs/toolkit";

interface PatientState {
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  loading: false,
  error: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
});

export const {} = patientSlice.actions;

export default patientSlice.reducer;
