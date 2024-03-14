import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { msf } from "../../../../config/constants";

export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(msf);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postUser = createAsyncThunk("users/postUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(msf, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${msf}/${data?.id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${msf}/${data.get("id")}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const msfUserSlice = createSlice({
  name: "msfUser",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    view: JSON.parse(localStorage.getItem("msfUserView")) || "table",
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
      .addCase(postUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(postUser.rejected, (state, action) => {
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

export const { setSort, setView } = msfUserSlice.actions;

export default msfUserSlice.reducer;
