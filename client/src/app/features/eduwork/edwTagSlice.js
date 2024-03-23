import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const getTags = createAsyncThunk("tags/getTags", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${edw}/tag`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postTag = createAsyncThunk("tags/postTag", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${edw}/tag`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteTag = createAsyncThunk("tags/deleteTag", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${edw}/tag/${data?._id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateTag = createAsyncThunk("tags/updateTag", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${edw}/tag/${data.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwTagSlice = createSlice({
  name: "edwTag",
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
      .addCase(getTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postTag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postTag.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateTag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteTag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTag.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setEditMode } = edwTagSlice.actions;

export default edwTagSlice.reducer;
