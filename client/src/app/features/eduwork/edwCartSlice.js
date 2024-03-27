import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const getCart = createAsyncThunk("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${edw}/cart`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateCart = createAsyncThunk("cart/updateCart", async ({ data, token }, { rejectWithValue }) => {
  try {
    console.log(data);
    const response = await axios.patch(`${edw}/cart`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwCartSlice = createSlice({
  name: "edwCart",
  initialState: {
    carts: [],
    status: "idle",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default edwCartSlice.reducer;
