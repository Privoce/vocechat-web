// for SSE

import { createApi } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import BASE_URL from "../../config";
import { setReady } from "../../slices/ui";
import {
  fullfillChannels,
  addChannel,
  removeChannel,
} from "../../slices/channels";
import { updateUsersVersion } from "../../slices/footprint";
import { updateUsersByLogs, updateUsersStatus } from "../../slices/contacts";
import { resetAuthData } from "../../slices/auth.data";
import baseQuery from "../base.query";
import chatMessageHandler from "./chat.handler";
const getQueryString = (params = {}) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};
export const streamingApi = createApi({
  reducerPath: "streamingApi",
  baseQuery,
  refetchOnMountOrArgChange: true,
  tagTypes: ["streaming"],
  endpoints: (builder) => ({
    initStreaming: builder.query({
      query: () => ({ url: `user/me?ts=${new Date().getTime()}` }),
      async onCacheEntryAdded(
        arg,
        { dispatch, getState, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // todo
        const {
          authData: { token },
          footprint: { usersVersion, afterMid },
        } = getState();
        // create a websocket connection when the cache subscription starts
        const streaming = new EventSource(
          `${BASE_URL}/user/events?${getQueryString({
            "api-key": token,
            users_version: usersVersion,
            after_mid: afterMid,
          })}`
        );
        console.log("cache loaded 1");
        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;
          console.log("cache loaded 2");

          streaming.onmessage = (evt) => {
            const {
              ui: { ready },
              authData: { uid: loginUid },
            } = getState();
            const data = JSON.parse(evt.data);
            const { type } = data;
            switch (type) {
              case "heartbeat":
                console.log("heartbeat");
                break;
              case "ready":
                console.log("streaming ready");
                dispatch(setReady());
                break;
              case "users_snapshot":
                {
                  console.log("users snapshot");
                  const { version } = data;
                  dispatch(updateUsersVersion(version));
                }
                break;
              case "users_log":
                {
                  console.log("users change logs");
                  const { logs } = data;
                  dispatch(updateUsersByLogs(logs));
                }
                break;
              case "users_state":
              case "users_state_changed":
                {
                  let { type, ...rest } = data;
                  const onlines =
                    type == "users_state_changed" ? [rest] : rest.users;
                  dispatch(updateUsersStatus(onlines));
                }
                break;
              case "kick":
                {
                  console.log("kicked");
                  switch (data.reason) {
                    case "login_from_other_device":
                      dispatch(resetAuthData());
                      toast("kicked from the other device");
                      break;
                    case "delete_user":
                      dispatch(resetAuthData());
                      toast("sorry, your account has been deleted");
                      break;
                    default:
                      break;
                  }
                }
                break;
              case "related_groups":
                console.log("fullfill channels from streaming", data);
                dispatch(fullfillChannels(data.groups));
                break;
              case "joined_group":
                console.log("joined group", data.group);
                dispatch(addChannel(data.group));
                break;
              case "kick_from_group":
                console.log("kicked from group", data.gid);
                dispatch(removeChannel(data.gid));
                break;
              case "chat":
                {
                  chatMessageHandler(data, dispatch, { ready, loginUid });
                }
                break;

              default:
                console.log("sse event data", data);
                break;
            }
          };
          streaming.onopen = () => {
            console.info("sse opened");
          };
          streaming.onerror = (err) => {
            switch (err.eventPhase) {
              case EventSource.CLOSED:
                console.log("sse error closed error");
                break;
              case EventSource.CONNECTING:
                console.log("sse error connecting error");
                // streamingApi.util.resetApiState({ type: "initStreaming" });
                streamingApi.util.invalidateTags("streaming");
                streamingApi.util.updateQueryData("initStreaming");
                break;

              default:
                console.error("sse error error", err);
                // renewToken({ token, refreshToken });
                break;
            }
          };
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        console.log("close streaming");
        streaming.close();
      },
    }),
  }),
});

export const {
  useInitStreamingQuery,
  useLazyInitStreamingQuery,
} = streamingApi;
