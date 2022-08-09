import { useEffect, useState } from "react";
import { fetchEventSource, EventStreamContentType } from "@microsoft/fetch-event-source";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import BASE_URL from "../../../app/config";
import { setReady } from "../../../app/slices/ui";
import { useRenewMutation } from "../../../app/services/auth";
import {
  fillChannels,
  addChannel,
  removeChannel,
  updateChannel,
  updatePinMessage
} from "../../../app/slices/channels";
import {
  updateUsersVersion,
  updateReadChannels,
  updateReadUsers,
  updateMute
} from "../../../app/slices/footprint";
import { updateUsersByLogs, updateUsersStatus } from "../../../app/slices/users";
import { resetAuthData } from "../../../app/slices/auth.data";
import chatMessageHandler from "./chat.handler";
import store, { useAppDispatch, useAppSelector } from "../../../app/store";
import { ServerEvent, UsersStateEvent } from "../../../types/sse";

class RetriableError extends Error {}

class FatalError extends Error {}

const getQueryString = (params: { [key: string]: string }) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};
let inter: number | null = null;

export default function useStreaming() {
  const [readyPullData, setReadyPullData] = useState(false);
  const {
    authData,
    ui: { ready, online },
    footprint: { afterMid, usersVersion, readUsers, readChannels }
  } = useAppSelector((store) => store);
  const [renewToken] = useRenewMutation();
  const dispatch = useAppDispatch();
  const loginUid = authData.user?.uid || 0;
  let initialized = false;
  let initializing = false;
  let controller = new AbortController();

  const startStreaming = async () => {
    console.log("start streaming", initialized, initializing);
    if (initialized || initializing) return;
    // 如果token快要过期，先renew
    const {
      authData: { token = "", expireTime = +new Date(), refreshToken }
    } = store.getState();
    let api_token = token;
    const tokenAlmostExpire = dayjs().isAfter(new Date(expireTime - 20 * 1000));
    if (tokenAlmostExpire && refreshToken && token) {
      const resp = await renewToken({
        token,
        refresh_token: refreshToken
      });
      if ("error" in resp) return;
      if ("data" in resp) {
        api_token = resp.data.token;
      }
    }

    // 开始初始化
    initializing = true;
    await fetchEventSource(
      `${BASE_URL}/user/events?${getQueryString({
        "api-key": api_token,
        users_version: `${usersVersion}`,
        after_mid: `${afterMid}`
      })}`,
      {
        openWhenHidden: true,
        signal: controller.signal,
        async onopen(response) {
          initializing = false;
          if (response.ok && response.headers.get("content-type") === EventStreamContentType) {
            console.log("sse everything ok");
            initialized = true;
            return; // everything's good
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            // 重新登录
            // client-side errors are usually non-retriable:
            console.log("sse debug: open fatal");
            throw new FatalError();
          } else {
            // server error
            console.log("sse debug: open retry");
            throw new RetriableError();
          }
        },
        onmessage(evt) {
          initializing = false;
          console.log("sse message", evt.data);
          // if the server emits an error message, throw an exception
          // so it gets handled by the onerror callback below:
          if (evt.event === "FatalError") {
            console.log("sse debug: error message fatal");
            throw new FatalError(evt.data);
          }
          const data: ServerEvent = JSON.parse(evt.data);
          const { type } = data;
          switch (type) {
            case "heartbeat":
              console.log("heartbeat", loginUid);
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
                Object.keys(data).forEach((key) => {
                  switch (key) {
                    case "read_index_groups":
                      dispatch(updateReadChannels(data[key]));
                      break;
                    case "read_index_users":
                      dispatch(updateReadUsers(data[key]));
                      break;
                    case "add_mute_users":
                    case "mute_users":
                    case "add_mute_groups":
                    case "mute_groups":
                      {
                        const arr = data[key];
                        if (arr && arr.length) {
                          const _key = key.endsWith("users") ? "add_users" : "add_groups";
                          dispatch(updateMute({ [_key]: arr }));
                        }
                      }
                      break;
                    case "remove_mute_users":
                    case "remove_mute_groups":
                      {
                        const arr = data[key];
                        if (arr && arr.length) {
                          const _key = key.endsWith("users") ? "remove_users" : "remove_groups";
                          dispatch(updateMute({ [_key]: arr }));
                        }
                      }
                      break;

                    default:
                      break;
                  }
                });
              }
              break;
            case "users_state":
            case "users_state_changed":
              {
                let { type, ...rest } = data;
                const onlines =
                  type == "users_state_changed" ? [rest] : (rest as UsersStateEvent).users;
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
              console.log("fill channels from streaming", data);
              dispatch(fillChannels(data.groups));
              break;
            case "joined_group":
              console.log("joined group", data.group);
              dispatch(addChannel(data.group));
              break;
            case "group_changed":
              {
                const { gid, ...rest } = data;
                dispatch(
                  updateChannel({
                    gid,
                    ...rest
                  })
                );
              }
              break;
            case "user_joined_group":
              {
                console.log("new user joined group", data.gid);
                const { gid, uid: uids } = data;
                // 去重
                dispatch(
                  updateChannel({
                    operation: "add_member",
                    gid,
                    members: uids
                  })
                );
              }
              break;
            case "user_leaved_group":
              {
                const { gid, uid: uids } = data;
                if (uids.findIndex((uid) => uid == loginUid) > -1) {
                  dispatch(removeChannel(gid));
                } else {
                  dispatch(
                    updateChannel({
                      operation: "remove_member",
                      gid,
                      members: uids
                    })
                  );
                }
              }
              break;
            case "kick_from_group":
              console.log("kicked from group", data.gid);
              dispatch(removeChannel(data.gid));
              break;
            case "pinned_message_updated":
              {
                // const {gid,mid,msg}=data;
                dispatch(updatePinMessage(data));
              }
              break;
            case "chat":
              {
                chatMessageHandler(data, dispatch, {
                  ready,
                  loginUid,
                  readUsers,
                  readChannels
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
          console.log("sse debug: closed");
          initializing = false;
          throw new RetriableError();
        },
        onerror(err) {
          initializing = false;
          if (err instanceof FatalError || err.toString().indexOf("network error") > -1) {
            console.log("sse debug: error fatal", err);
            throw err; // rethrow to stop the operation
          } else {
            console.log("sse debug: error other", err);
            stopStreaming();
            if (inter) {
              clearTimeout(inter);
            }
            // 重连
            inter = window.setTimeout(() => {
              initialized = false;
              startStreaming();
            }, 2000);
            throw err; // rethrow to stop the operation
            // do nothing to automatically retry. You can also
            // return a specific retry interval here.
          }
        }
      }
    );
    initializing = false;
    // for controlling
    return controller;
  };

  const stopStreaming = () => {
    console.log("stop st");
    if (controller && controller.abort) {
      controller.abort();
    }
  };

  const setStreamingReady = (ready: boolean) => {
    setReadyPullData(ready);
  };

  useEffect(() => {
    console.log("network changed", online, readyPullData);
    if (readyPullData) {
      if (online) {
        startStreaming();
      } else {
        stopStreaming();
      }
    }
    return () => {
      stopStreaming();
    };
  }, [online, readyPullData]);

  return {
    setStreamingReady,
    startStreaming,
    stopStreaming
  };
}
