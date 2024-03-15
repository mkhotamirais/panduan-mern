import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { msa } from "../../../../config/constants";

export const getUsers = createAsyncThunk("users/getUsers", async ({ axiosJWT, token }, { rejectWithValue }) => {
  try {
    const response = await axiosJWT.get(`${msa}/user`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});
// export const getUsers = createAsyncThunk("users/getUsers", async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(`${msa}/user`);
//     return response.data.data;
//   } catch (error) {
//     return rejectWithValue(error?.response?.data?.message || error?.message);
//   }
// });

export const deleteUser = createAsyncThunk("users/deleteUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${msa}/user/${data?.id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const postUser = createAsyncThunk("users/postUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${msa}/user`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateUser = createAsyncThunk("users/updateUser", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${msa}/user/${data?.id}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const msaUserSlice = createSlice({
  name: "msaUser",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    view: JSON.parse(localStorage.getItem("msaUserView")) || "table",
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
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
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
      });
  },
});

export const { setSort, setView } = msaUserSlice.actions;

export default msaUserSlice.reducer;
