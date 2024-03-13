import { createSlice } from "@reduxjs/toolkit";

const collapseSlice = createSlice({
  name: "collapse",
  initialState: {
    openSidebar: false,
  },
  reducers: {
    setOpenSidebar(state) {
      state.openSidebar = !state.openSidebar;
    },
  },
});

export const { setOpenSidebar } = collapseSlice.actions;

export default collapseSlice.reducer;
