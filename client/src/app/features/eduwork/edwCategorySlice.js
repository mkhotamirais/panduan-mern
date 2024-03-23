import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const getCategories = createAsyncThunk("categories/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${edw}/category`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postCategory = createAsyncThunk("categories/postCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${edw}/category`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteCategory = createAsyncThunk("categories/deleteCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${edw}/category/${data?._id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateCategory = createAsyncThunk("categories/updateCategory", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${edw}/category/${data.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwCategorieSlice = createSlice({
  name: "edwCategory",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    editMode: null,
  },
  reducers: {
    setEditMode(state, action) {
      state.editMode = action.payload;
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

export const { setEditMode } = edwCategorieSlice.actions;

export default edwCategorieSlice.reducer;
