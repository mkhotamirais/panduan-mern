import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { reduxThunk } from "../../../../config/constants";

export const getProductsThunk = createAsyncThunk("product/getProductsThunk", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(reduxThunk);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postProductThunk = createAsyncThunk("product/postProductThunk", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(reduxThunk, data);
    return { data: response.data, message: `Berhasil post product ${response.data.name}` };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteProductThunk = createAsyncThunk("product/deleteProductThunk", async (item, { rejectWithValue }) => {
  try {
    await axios.delete(`${reduxThunk}/${item.id}`);
    return { data: item, message: `Berhasil hapus produk ${item.name}` };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateProductThunk = createAsyncThunk("product/updateProductThunk", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${reduxThunk}/${data.id}`, data);
    return { data: response.data, message: `Berhasil update produk ${response.data.name}` };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productAdapter = createEntityAdapter({});

const initialState = productAdapter.getInitialState({
  status: "idle",
  error: null,
  view: JSON.parse(localStorage.getItem("reduxThunkView")) || "table",
  sort: "updatedAt",
});

const reduxThunkSlice = createSlice({
  name: "product",
  initialState,
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
      .addCase(getProductsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.setAll(state, action.payload);
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postProductThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postProductThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.addOne(state, action.payload.data);
      })
      .addCase(postProductThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteProductThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateProductThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        productAdapter.upsertOne(state, action.payload.data);
      })
      .addCase(updateProductThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setView, setSort } = reduxThunkSlice.actions;

export const { selectAll: selectAllProducts, selectById: selectProductById } = productAdapter.getSelectors(
  (state) => state.reduxThunk
);

export default reduxThunkSlice.reducer;
