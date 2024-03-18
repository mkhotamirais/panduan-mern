import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mys } from "../../../config/constants";

export const getProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${mys}/v5/product`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postProduct = createAsyncThunk("products/postProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${mys}/v5/product`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${mys}/v5/product/${data?.uuid}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${mys}/v5/product/${data?.uuid}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const mysV5ProductSlice = createSlice({
  name: "mysV5Product",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    view: JSON.parse(localStorage.getItem("mysV5ProductView")) || "table",
    sort: "createdAt",
  },
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSort, setView } = mysV5ProductSlice.actions;

export default mysV5ProductSlice.reducer;
