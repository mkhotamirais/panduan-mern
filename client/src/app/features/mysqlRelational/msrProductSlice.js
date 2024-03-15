import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mysqlRelational } from "../../../../config/constants";

export const getProducts = createAsyncThunk("products/getProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${mysqlRelational}/products`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${mysqlRelational}/products/${data?.id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postProduct = createAsyncThunk("products/postProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${mysqlRelational}/products`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${mysqlRelational}/products/${data?.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const msrProductSlice = createSlice({
  name: "msrProduct",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    sort: "updatedAt",
    view: JSON.parse(localStorage.getItem("mysqlRelationalView")) || "table",
  },
  reducers: {
    setView(state, action) {
      state.view = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
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
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
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
      });
  },
});

export const { setView, setSort } = msrProductSlice.actions;

export default msrProductSlice.reducer;
