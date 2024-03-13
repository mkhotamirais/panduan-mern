import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fcc } from "../../../../config/constants";

export const v1FccGetBooks = createAsyncThunk("v1FccBook/v1FccGetBooks", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${fcc}/v1/book`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.message || error?.message);
  }
});

export const v1FccPostBook = createAsyncThunk("v1FccBook/v1FccPostBook", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${fcc}/v1/book`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const v1FccDeleteBook = createAsyncThunk("v1FccBook/v1FccDeleteBook", async (data, { rejectWithValue }) => {
  try {
    let response = await axios.delete(`${fcc}/v1/book/${data?._id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const v1FccUpdateBook = createAsyncThunk("v1FccBook/v1FccUpdateBook", async (data, { rejectWithValue }) => {
  try {
    let response = await axios.patch(`${fcc}/v1/book/${data?.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const initialState = {
  data: [],
  status: "idle",
  error: null,
  sort: "createdAt",
};

const v1FccBookSlice = createSlice({
  name: "v1FccBook",
  initialState,
  reducers: {
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(v1FccGetBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(v1FccGetBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
      })
      .addCase(v1FccGetBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(v1FccPostBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(v1FccPostBook.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(v1FccPostBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(v1FccDeleteBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(v1FccDeleteBook.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(v1FccDeleteBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(v1FccUpdateBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(v1FccUpdateBook.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(v1FccUpdateBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSort } = v1FccBookSlice.actions;

export default v1FccBookSlice.reducer;
