import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base.query";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "token/login",
        method: "POST",
        body: { credential: credentials, device: "web", device_token: "test" },
      }),
      // transformResponse: (resp) => {
      //   console.log("resp", resp);
      //   if (resp.status == 401) {
      //     resp.msg = "username or password incorrect";
      //   }
      //   return resp;
      // },
    }),
    logout: builder.query({
      query: () => ({ url: `token/logout` }),
    }),
  }),
});

export const { useLoginMutation, useLazyLogoutQuery } = authApi;
