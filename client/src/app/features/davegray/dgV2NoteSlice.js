import { createSlice } from "@reduxjs/toolkit";

const dgV2NoteSlice = createSlice({
  name: "dgV2Note",
  initialState: {
    sort: "createdAt",
    view: JSON.parse(localStorage.getItem("dgV2NoteView")) || "table",
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

export const { setSort, setView } = dgV2NoteSlice.actions;

export default dgV2NoteSlice.reducer;
