import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base.query";
import BASE_URL, { ContentTypes } from "../config";
import { REHYDRATE } from "redux-persist";

export const contactApi = createApi({
  reducerPath: "contact",
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
      query: ({ id, content, type = "text" }) => ({
        headers: {
          "content-type": ContentTypes[type],
        },
        url: `user/${id}/send`,
        method: "POST",
        body: content,
      }),
    }),
  }),
});

export const { useGetContactsQuery, useSendMsgMutation } = contactApi;
