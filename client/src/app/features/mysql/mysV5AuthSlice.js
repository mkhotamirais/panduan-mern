import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mys } from "../../../config/constants";

export const signin = createAsyncThunk("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${mys}/v5/auth/signin`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const me = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${mys}/v5/auth/me`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const signout = createAsyncThunk("auth/signout", async () => {
  await axios.delete(`${mys}/v5/auth/signout`);
});

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  error: null,
};

export const mysV5AuthSlice = createSlice({
  name: "mysV5Auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        console.log(state.data);
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(me.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = mysV5AuthSlice.actions;

export default mysV5AuthSlice.reducer;
