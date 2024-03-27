import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const signinn = createAsyncThunk("auth/signinn", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${edw}/auth/signin`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${edw}/auth/signup`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const signout = createAsyncThunk("auth/signout", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${edw}/auth/signout`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwAuthSlice = createSlice({
  name: "edwAuth",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    cred: JSON.parse(localStorage.getItem("edwToken")) || null,
  },
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signinn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cred = action.payload;
        localStorage.setItem("edwToken", JSON.stringify(action.payload));
      })
      .addCase(signinn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signout.fulfilled, (state) => {
        state.status = "succeeded";
        state.cred = null;
        localStorage.removeItem("edwToken");
      })
      .addCase(signout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// export const {} = edwAuthSlice.actions;

export default edwAuthSlice.reducer;
