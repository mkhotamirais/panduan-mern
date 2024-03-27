import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const getProducts = createAsyncThunk("products/getProducts", async ({ query, tags }, { rejectWithValue }) => {
  try {
    let result, q1, q2;
    if (!query?.limit) result = "limit=3";
    if (query?.q || query?.category || query?.limit) {
      q1 = Object.entries(query)
        .map((item) => item.join("="))
        .join("&");
      result = q1;
    }
    if (tags.length > 0) {
      q2 = tags.join("&tags=");
      if (q1) result = `${result}&tags=${q2}`;
      else result = `tags=${q2}`;
    }
    const response = await axios.get(`${edw}/product?${result}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postProduct = createAsyncThunk("products/postProduct", async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${edw}/product`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${edw}/product/${data?._id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ data, token }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${edw}/product/${data.get("id")}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwProductSlice = createSlice({
  name: "edwProduct",
  initialState: {
    data: [],
    total: 0,
    totalCriteria: 0,
    status: "idle",
    error: null,
    view: JSON.parse(localStorage.getItem("edwProductView")) || "table",
    sort: "createdAt",
    query: {},
    tags: [],
    limit: 3,
    currentPage: 1,
  },
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
    setView(state, action) {
      state.view = action.payload;
    },
    setQuery(state, action) {
      state.query = action.payload;
    },
    setTags(state, action) {
      state.tags = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.total = action.payload.count;
        state.totalCriteria = action.payload.countCriteria;
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

export const { setSort, setView, setQuery, setTags, setLimit, setCurrentPage } = edwProductSlice.actions;

export default edwProductSlice.reducer;
