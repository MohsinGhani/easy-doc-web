import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DropdownStateProps {
  countryValue: string;
  openCountryDropdown: boolean;
  stateValue: string;
  openStateDropdown: boolean;
}

const initialState: DropdownStateProps = {
  countryValue: "",
  openCountryDropdown: false,
  stateValue: "",
  openStateDropdown: false,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setCountryValue: (state, action: PayloadAction<string>) => {
      state.countryValue = action.payload;
    },
    setOpenCountryDropdown: (state, action: PayloadAction<boolean>) => {
      state.openCountryDropdown = action.payload;
    },
    setStateValue: (state, action: PayloadAction<string>) => {
      state.stateValue = action.payload;
    },
    setOpenStateDropdown: (state, action: PayloadAction<boolean>) => {
      state.openStateDropdown = action.payload;
    },
  },
});

// Export actions
export const {
  setCountryValue,
  setOpenCountryDropdown,
  setStateValue,
  setOpenStateDropdown,
} = dropdownSlice.actions;

// Export the reducer to be included in the store
export default dropdownSlice.reducer;
