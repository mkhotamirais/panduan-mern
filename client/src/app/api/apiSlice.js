import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { rtk } from "../../config/constants";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: rtk }),
  endpoints: () => ({}),
});
