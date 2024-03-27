import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { edw } from "../../../config/constants";

export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${edw}/user`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${edw}/user/${data?._id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${edw}/user/${data.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const edwUserSlice = createSlice({
  name: "edwUser",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    view: JSON.parse(localStorage.getItem("edwUserView")) || "table",
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
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setSort, setView } = edwUserSlice.actions;

export default edwUserSlice.reducer;
