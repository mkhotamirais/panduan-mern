import { createSlice } from "@reduxjs/toolkit";

const dgV2Employee = createSlice({
  name: "dgV2Employee",
  initialState: {
    sort: "createdAt",
    view: JSON.parse(localStorage.getItem("dgV2EmployeeView")) || "table",
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

export const { setSort, setView } = dgV2Employee.actions;

export default dgV2Employee.reducer;
