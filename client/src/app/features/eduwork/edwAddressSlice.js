import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const postAddress = createAsyncThunk("address/postAddress", async ({ data, token }, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await axios.post(`${edw}/address`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const getAddress = createAsyncThunk("address/getAddress", async (token, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${edw}/address`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteAddress = createAsyncThunk("address/deleteAddress", async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${edw}/address/${data?._id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwAddressSlice = createSlice({
  name: "edwAddress",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default edwAddressSlice.reducer;
