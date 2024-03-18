import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mys } from "../../../config/constants";
import { jwtDecode } from "jwt-decode";

export const signin = createAsyncThunk("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${mys}/v4/auth/signin`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${mys}/v4/auth/refresh`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const signoutv4 = createAsyncThunk("auth/signoutv4", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${mys}/v4/auth/signout`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const initialState = {
  decoded: null,
  status: "idle",
  token: null,
  error: null,
};

export const mysV4AuthSlice = createSlice({
  name: "mysV4Auth",
  initialState,
  reducers: {
    resetv4: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.decoded = jwtDecode(action.payload.data);
        state.token = action.payload.data;
      })
      .addCase(signin.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload);
      })
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.decoded = jwtDecode(action.payload.data);
        state.token = action.payload.data;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signoutv4.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signoutv4.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(signoutv4.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetv4 } = mysV4AuthSlice.actions;

export default mysV4AuthSlice.reducer;
