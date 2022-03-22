import { useState, useCallback } from "react";
import {
  fetchEventSource,
  EventStreamContentType,
} from "@microsoft/fetch-event-source";
import toast from "react-hot-toast";
import BASE_URL from "../../../app/config";
import { setReady } from "../../../app/slices/ui";
import { useRenewMutation } from "../../../app/services/auth";
import {
  fullfillChannels,
  addChannel,
  removeChannel,
  updateChannel,
} from "../../../app/slices/channels";
import {
  updateUsersVersion,
  updateReadChannels,
  updateReadUsers,
} from "../../../app/slices/footprint";
import {
  updateUsersByLogs,
  updateUsersStatus,
} from "../../../app/slices/contacts";
import { resetAuthData } from "../../../app/slices/auth.data";
import chatMessageHandler from "./chat.handler";

import { useDispatch, useSelector } from "react-redux";
class RetriableError extends Error {}
class FatalError extends Error {}
const getQueryString = (params = {}) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};
const StreamStatus = {
  waiting: "waiting",
  initializing: "initializing",
  streaming: "streaming",
};
export default function useStreaming() {
  const store = useSelector((store) => store);
  const [renewToken] = useRenewMutation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(StreamStatus.waiting);
  const startStreaming = useCallback(() => {
    if (status !== StreamStatus.waiting) return;
    const controller = new AbortController();
    setStatus(StreamStatus.initializing);
    const {
      authData: { token, uid: loginUid },
      footprint: { afterMid, usersVersion },
    } = store;
    console.log("set uid use");

    fetchEventSource(
      `${BASE_URL}/user/events?${getQueryString({
        "api-key": token,
        users_version: usersVersion,
        after_mid: afterMid,
      })}`,
      {
        openWhenHidden: true,
        signal: controller.signal,
        async onopen(response) {
          if (
            response.ok &&
            response.headers.get("content-type") === EventStreamContentType
          ) {
            console.log("sse everything ok");
            setStatus(StreamStatus.streaming);
            return; // everything's good
          } else if (
            response.status >= 400 &&
            response.status < 500 &&
            response.status !== 429
          ) {
            // 重新登录
            if (response.status == 401) {
              renewToken();
              // dispatch(resetAuthData());
              // return;
            }
            // client-side errors are usually non-retriable:
            throw new FatalError();
          } else {
            throw new RetriableError();
          }
        },
        onmessage(evt) {
          console.log("sse message", evt.data);
          // if the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below:
          if (evt.event === "FatalError") {
            throw new FatalError(evt.data);
          }
          const {
            ui: { ready },
            footprint: { readUsers, readChannels },
            channels: { byId: channelData },
          } = store;
          const data = JSON.parse(evt.data);
          const { type } = data;
          switch (type) {
            case "heartbeat":
              console.log("heartbeat", store, loginUid);
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
            case "user_settings":
            case "user_settings_changed":
              {
                console.log("users settings");
                const { read_index_users = [], read_index_groups = [] } = data;
                dispatch(updateReadChannels(read_index_groups));
                dispatch(updateReadUsers(read_index_users));
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
            case "user_joined_group":
              console.log("new user joined group", data.gid);
              // 去重
              dispatch(
                updateChannel({
                  id: data.gid,
                  members: [
                    ...channelData[data.gid].members,
                    ...data.uid,
                  ].filter((v, i, a) => a.indexOf(v) === i),
                })
              );
              break;
            case "user_leaved_group":
              {
                const { gid, uid: uids } = data;
                const leftMembers = channelData[gid].members.filter(
                  (id) => uids.findIndex((uid) => id == uid) == -1
                );
                dispatch(
                  updateChannel({
                    id: data.gid,
                    members: [...leftMembers],
                  })
                );
              }
              break;
            case "kick_from_group":
              console.log("kicked from group", data.gid);
              dispatch(removeChannel(data.gid));
              break;
            case "chat":
              {
                chatMessageHandler(data, dispatch, {
                  ready,
                  loginUid,
                  readUsers,
                  readChannels,
                });
              }
              break;

            default:
              console.log("sse event data", data);
              break;
          }
        },
        onclose() {
          // if the server closes the connection unexpectedly, retry:
          throw new RetriableError();
        },
        onerror(err) {
          if (err instanceof FatalError) {
            // 重连
            setTimeout(() => {
              startStreaming();
            }, 500);
            throw err; // rethrow to stop the operation
          } else {
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        },
      }
    );
    // for controlling
    return controller;
  }, [store, status]);
  return {
    initializing: status == StreamStatus.initializing,
    streaming: status == StreamStatus.streaming,
    startStreaming,
  };
}
