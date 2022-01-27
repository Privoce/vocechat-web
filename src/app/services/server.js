import { createApi } from "@reduxjs/toolkit/query/react";
import BASE_URL from "../config";
// import { REHYDRATE } from 'redux-persist';

import baseQuery from "./base.query";

export const serverApi = createApi({
  reducerPath: "server",
  baseQuery,
  // extractRehydrationInfo(action, { reducerPath }) {
  //     if (action.type === REHYDRATE) {
  //         return action.payload ? action.payload[reducerPath] : undefined;
  //     }
  // },
  endpoints: (builder) => ({
    getServer: builder.query({
      query: () => ({ url: `admin/system/company` }),
      transformResponse: (data) => {
        data.logo = `${BASE_URL}/resource/company/logo`;
        return data;
      },
    }),
  }),
});

export const { useGetServerQuery } = serverApi;
