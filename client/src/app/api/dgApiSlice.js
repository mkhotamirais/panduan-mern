import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { dg } from "../../config/constants";

export const dgApiSlice = createApi({
  reducerPath: "dgApi",
  baseQuery: fetchBaseQuery({ baseUrl: dg }),
  endpoints: () => ({}),
});
