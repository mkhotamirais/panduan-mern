import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const productAdapter = createEntityAdapter({});
const initialState = productAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      transformResponse: (responseData) => {
        // const loadedProducts = responseData.map((p) => {
        //     p.id = p._id;
        //     return p
        // })
        return productAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: "Product", id: "LIST" }, ...result.ids.map((id) => ({ type: "Product", id }))];
        } else [{ type: "Product", id: "LIST" }];
      },
    }),
    postProduct: builder.mutation({
      query: (initialProduct) => ({ url: "/products", method: "POST", body: initialProduct }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: (initialProduct) => ({ url: `/products/${initialProduct.id}`, method: "PATCH", body: initialProduct }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),
  }),
});

export const { useGetProductsQuery, usePostProductMutation, useUpdateProductMutation, useDeleteProductMutation } =
  productApiSlice;

const selectProductResult = productApiSlice.endpoints.getProducts.select();
const selectProductData = createSelector(selectProductResult, (productResult) => productResult.data);

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productAdapter.getSelectors((state) => selectProductData(state) ?? initialState);
