import { createSlice } from "@reduxjs/toolkit";

const productRtkSlice = createSlice({
  name: "productRtk",
  initialState: {
    view: "table",
    sort: "createdAt",
  },
  reducers: {
    setView(state, action) {
      state.view = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
});

export const { setView, setSort } = productRtkSlice.actions;
export default productRtkSlice.reducer;
