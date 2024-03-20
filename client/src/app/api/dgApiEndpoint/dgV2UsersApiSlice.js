import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { dgApiSlice } from "../dgApiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const dgV2UsersApiSlice = dgApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/v2/user",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedUsers = responseData.data.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: "User", id: "LIST" }, ...result.ids.map((id) => ({ type: "User", id }))];
        } else [{ type: "User", id: "LIST" }];
      },
    }),
    signup: builder.mutation({
      query: (initialUserData) => ({ url: "/v2/auth/signup", method: "POST", body: { ...initialUserData } }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: `/v2/user/${initialUserData?.id}`,
        method: "PATCH",
        body: { ...initialUserData },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({ url: `/v2/user/${id}`, method: "DELETE", body: { id } }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const { useGetUsersQuery, useSignupMutation, useUpdateUserMutation, useDeleteUserMutation } = dgV2UsersApiSlice;

export const selectUsersResult = dgV2UsersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(selectUsersResult, (usersResult) => usersResult.data);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
