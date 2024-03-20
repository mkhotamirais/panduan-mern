import { createSlice } from "@reduxjs/toolkit";

const dgV2UserSlice = createSlice({
  name: "dgV2User",
  initialState: {
    sort: "createdAt",
    view: JSON.parse(localStorage.getItem("dgV2UserView")) || "table",
  },
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
  },
});

export const { setSort, setView } = dgV2UserSlice.actions;

export default dgV2UserSlice.reducer;
