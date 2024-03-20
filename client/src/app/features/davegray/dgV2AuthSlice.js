import { createSlice } from "@reduxjs/toolkit";

const dgV2AuthSlice = createSlice({
  name: "dgV2Auth",
  initialState: {
    token: null,
  },
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload?.accessToken;
    },
    logout(state) {
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = dgV2AuthSlice.actions;

export default dgV2AuthSlice.reducer;
