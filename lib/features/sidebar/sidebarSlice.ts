import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createSlice } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export const useSidebarToggle = () => {
  const { isOpen } = useAppSelector((state) => state.sidebar);
  const dispatch = useAppDispatch();

  const setIsOpen = () => {
    dispatch(toggleSidebar());
  };

  return { isOpen, setIsOpen };
};

export default sidebarSlice.reducer;
