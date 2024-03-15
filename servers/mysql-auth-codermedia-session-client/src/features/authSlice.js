import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:3000/auth";

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    return (await axios.post(`${url}/login`, data)).data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const me = createAsyncThunk("auth/me", async (_, { rejectWithValue }) => {
  try {
    return (await axios.get(`${url}/me`)).data;
  } catch (err) {
    return rejectWithValue(err.response.data.message);
  }
});

export const logout = createAsyncThunk("auth/me", async () => {
  await axios.delete(`${url}/logout`);
});

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = "true";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(me.pending, (state) => {
        state.isLoading = "true";
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(me.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
