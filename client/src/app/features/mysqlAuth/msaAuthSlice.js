import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { msa } from "../../../../config/constants";
import { jwtDecode } from "jwt-decode";

export const signin = createAsyncThunk("auth/signin", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${msa}/auth/signin`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const refresh = createAsyncThunk("auth/refresh", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${msa}/auth/refresh`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${msa}/auth/signup`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const msaAuthSlice = createSlice({
  name: "msaAuth",
  initialState: {
    status: "idle",
    error: null,
    decoded: {},
    token: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.decoded = jwtDecode(action.payload);
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.decoded = jwtDecode(action.payload);
        state.token = action.payload;
      });
  },
});
export const { setToken } = msaAuthSlice.actions;

export default msaAuthSlice.reducer;
