import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base.query";
import BASE_URL from "../config";
import { REHYDRATE } from "redux-persist";
export const contactApi = createApi({
  reducerPath: "contacts",
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload ? action.payload[reducerPath] : undefined;
    }
  },
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({ url: `user` }),
      transformResponse: (data) => {
        return data.map((user) => {
          const avatar = `${BASE_URL}/resource/avatar?uid=${user.uid}`;
          user.avatar = avatar;
          return user;
        });
      },
    }),
    sendMsg: builder.mutation({
      query: ({ uid, message }) => ({
        url: `user/${uid}/send`,
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useGetContactsQuery, useSendMsgMutation } = contactApi;
