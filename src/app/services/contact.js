import { createApi } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";
import toast from "react-hot-toast";

import baseQuery from "./base.query";
import BASE_URL, { ContentTypes } from "../config";
import { addUserMsg } from "../slices/message.user";
import {
  addPendingMessage,
  removePendingMessage,
} from "../slices/message.pending";

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
          const avatar =
            user.avatar_updated_at == 0
              ? ""
              : `${BASE_URL}/resource/avatar?uid=${user.uid}`;
          user.avatar = avatar;
          return user;
        });
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `user/register`,
        method: "POST",
        body: data,
      }),
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
      async onQueryStarted(
        { id, content, type, from_uid },
        { dispatch, queryFulfilled }
      ) {
        // id: who send to ,from_uid: who sent
        const mid = new Date().getTime();
        const tmpMsg = {
          id,
          content,
          content_type: ContentTypes[type],
          created_at: new Date().getTime(),
          mid,
          from_uid,
          unread: false,
        };
        dispatch(addPendingMessage({ type: "user", msg: tmpMsg }));
        try {
          const { data } = await queryFulfilled;
          // 此处的id，是指给谁发的
          dispatch(addUserMsg({ id, ...data, unread: false }));
          dispatch(removePendingMessage({ id, mid, type: "user" }));
        } catch {
          toast.error("Send Message Failed");
          dispatch(removePendingMessage({ id, mid, type: "user" }));
          // patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetContactsQuery,
  useSendMsgMutation,
  useRegisterMutation,
} = contactApi;
