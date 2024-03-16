import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { md } from "../../../../config/constants";

export const getCategories = createAsyncThunk("categories/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${md}/v2/category`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postCategory = createAsyncThunk("categories/postCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${md}/v2/category`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${md}/v2/category/${data?._id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateCategory = createAsyncThunk("categories/updateCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${md}/v2/category/${data.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const mdV2CategorieSlice = createSlice({
  name: "mdV2Category",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    view: JSON.parse(localStorage.getItem("mdV2CategoryView")) || "table",
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
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSort, setView } = mdV2CategorieSlice.actions;

export default mdV2CategorieSlice.reducer;
