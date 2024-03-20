import { logout } from "../../features/davegray/dgV2AuthSlice";
import { dgApiSlice } from "../dgApiSlice";

export const dgV2AuthApiSlice = dgApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({ url: "/v2/auth/signin", method: "post", body: { ...credentials } }),
    }),
    signout: builder.mutation({
      query: () => ({ url: "/v2/auth/signout", method: "DELETE" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          // const {data} =
          await queryFulfilled;
          // console.log(data)
          dispatch(logout());
          dispatch(dgApiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({ url: "/v2/auth/refresh", method: "GET" }),
    }),
  }),
});

export const { useSigninMutation, useSignoutMutation, useRefreshMutation } = dgV2AuthApiSlice;
