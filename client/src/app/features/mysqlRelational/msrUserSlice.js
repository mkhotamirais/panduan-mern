import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { mysqlRelational } from "../../../../config/constants";

export const getUsers = createAsyncThunk("products/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${mysqlRelational}/users`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteUser = createAsyncThunk("products/deleteUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${mysqlRelational}/users/${data?.id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postUser = createAsyncThunk("products/postUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${mysqlRelational}/users`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateUser = createAsyncThunk("products/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${mysqlRelational}/users/${data?.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const msrUserSlice = createSlice({
  name: "mrsUser",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    sort: "updatedAt",
    view: JSON.parse(localStorage.getItem("msrUser")) || "table",
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
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.payload;
      })
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postUser.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.payload;
      });
  },
});

export const { setView, setSort } = msrUserSlice.actions;

export default msrUserSlice.reducer;
