import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { dgApiSlice } from "../dgApiSlice";

const employeesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
});

const initialState = employeesAdapter.getInitialState();

export const dgV2EmployeesApiSlice = dgApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/v2/employee",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedEmployees = responseData.data.map((employee) => {
          employee.id = employee._id;
          return employee;
        });
        return employeesAdapter.setAll(initialState, loadedEmployees);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [{ type: "Employee", id: "LIST" }, ...result.ids.map((id) => ({ type: "Employee", id }))];
        } else [{ type: "Employee", id: "LIST" }];
      },
    }),
    postEmployee: builder.mutation({
      query: (initialEmployeeData) => ({ employee: "/v2/employee", method: "POST", body: { ...initialEmployeeData } }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    updateEmployee: builder.mutation({
      query: (initialEmployeeData) => ({ url: "/v2/employee", method: "PATCH", body: { ...initialEmployeeData } }),
      invalidatesTags: (result, error, arg) => [{ type: "Employee", id: arg.id }],
    }),
    deleteEmployee: builder.mutation({
      query: ({ id }) => ({ url: "/v2/employee", method: "DELETE", body: { id } }),
      invalidatesTags: (result, error, arg) => [{ type: "Employee", id: arg.id }],
    }),
  }),
});

export const { useGetEmployeesQuery, usePostEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation } =
  dgV2EmployeesApiSlice;

export const selectEmployeesResult = dgV2EmployeesApiSlice.endpoints.getEmployees.select();

const selectEmployeesData = createSelector(selectEmployeesResult, (employeesResult) => employeesResult.data);

export const {
  selectAll: selectAllEmployees,
  selectById: selectEmployeeById,
  selectIds: selectEmployeeIds,
} = employeesAdapter.getSelectors((state) => selectEmployeesData(state) ?? initialState);
