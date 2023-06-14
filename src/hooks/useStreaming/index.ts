import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import { isNull, omitBy } from "lodash";

import BASE_URL from "@/app/config";
import { useRenewMutation } from "@/app/services/auth";
import { resetAuthData, updateLoginUser, updateRoleChanged } from "@/app/slices/auth.data";
import {
  addChannel,
  fillChannels,
  removeChannel,
  updateChannel,
  updatePinMessage
} from "@/app/slices/channels";
import {
  removePinChats,
  updateAutoDeleteSetting,
  updateMute,
  updateReadChannels,
  updateReadUsers,
  updateUsersVersion,
  upsertPinChats
} from "@/app/slices/footprint";
import { clearChannelMessage, removeChannelSession } from "@/app/slices/message.channel";
import { removeUserSession } from "@/app/slices/message.user";
import { updateInfo } from "@/app/slices/server";
import { setReady } from "@/app/slices/ui";
import { updateContactStatus, updateUsersByLogs, updateUsersStatus } from "@/app/slices/users";
import { updateCallInfo } from "@/app/slices/voice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  ServerEvent,
  UserSettingsChangedEvent,
  UserSettingsEvent,
  UsersStateEvent
} from "@/types/sse";
import { getLocalAuthData } from "@/utils";
import chatMessageHandler from "./chat.handler";

const getQueryString = (params: { [key: string]: string }) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};

let SSE: EventSource | undefined;
let ready = false; //是否已完成初始推送
let aliveInter: number | ReturnType<typeof setTimeout> = 0;
export default function useStreaming() {
  const [renewToken] = useRenewMutation();
  const [streamingReady, setStreamingReady] = useState(false);
  const {
    authData: { user, guest },
    footprint: { afterMid, usersVersion, readUsers, readChannels }
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const loginUid = user?.uid || 0;

  const keepAlive = (timeout?: number) => {
    console.info("debug SSE: start new keepalive");
    clearTimeout(aliveInter);
    //  比15秒多5秒
    const countdown = timeout ?? 20000;
    console.info("debug SSE: clear prev timeout", aliveInter);
    aliveInter = setTimeout(() => {
      console.info("debug SSE: start reconnect");
      // 判断有网再试
      if (navigator.onLine) {
        console.info("debug SSE: start reconnect onLine");
        // 重启连接
        console.info("debug SSE: stopStreaming at timeout");
        stopStreaming();
        startStreaming();
      }
    }, countdown);
    console.info("debug SSE: start new timeout", aliveInter);
  };
  const startStreaming = useCallback(async () => {
    console.info("debug SSE: clear timeout at startStreaming", aliveInter);
    clearTimeout(aliveInter);
    if (SSE && (SSE.readyState === EventSource.OPEN || SSE.readyState === EventSource.CONNECTING)) {
      console.info("debug SSE: SSE not disconnect");
      return;
    }
    const { token, refreshToken, expireTime } = getLocalAuthData();
    //  token 非空
    if (!token) {
      console.info("debug SSE: token empty");
      return;
    }
    let _token = token;
    // 如果token快要过期，先renew
    if (dayjs().isAfter(new Date(expireTime - 20 * 1000))) {
      const resp = await renewToken({ token, refresh_token: refreshToken });
      if ("error" in resp) {
        return;
      } else {
        _token = resp.data.token;
      }
      // return;
    }
    // 开始初始化
    const params: {
      "api-key": string;
      after_mid?: string;
      users_version?: string;
    } = {
      "api-key": _token
    };
    // 如果afterMid是0，则不传该参数
    if (afterMid !== 0) {
      params.after_mid = `${afterMid}`;
    }
    // 如果usersVersion是0，则不传该参数
    if (usersVersion !== 0) {
      params.users_version = `${usersVersion}`;
    }
    // 开始初始化推送
    SSE = new EventSource(`${BASE_URL}/user/events?${getQueryString(params)}`);

    SSE.onopen = () => {
      ready = false;
      //todo
      // opened = true;
      // connectionIsOpen = true;
    };
    SSE.onerror = (err) => {
      const { readyState } = err.target as EventSource;
      console.error("sse error", readyState, err);
      // 连接还处于开启状态
      if (readyState === EventSource.OPEN || readyState === EventSource.CONNECTING) {
        return;
      }
      // 重连
      keepAlive(2000);
    };
    SSE.onmessage = (evt) => {
      // console.log("sse msg");
      const data: ServerEvent = JSON.parse(evt.data);
      const { type } = data;
      switch (type) {
        case "heartbeat":
          keepAlive();
          break;
        case "ready":
          ready = true;
          // 有时候，heartbeat不会发？
          keepAlive();
          dispatch(setReady());
          break;
        case "organization_config_changed": {
          const { name, description } = data;
          dispatch(updateInfo({ name, description }));
          break;
        }
        case "group_message_cleared": {
          const { gid } = data;
          dispatch(clearChannelMessage(gid));
          break;
        }
        case "user_calling": {
          const { target, uid } = data;
          dispatch(updateCallInfo({ from: uid, to: target, calling: true }));
          break;
        }

        case "users_snapshot": {
          const { version } = data;
          dispatch(updateUsersVersion(version));
          break;
        }
        case "users_log": {
          const { logs } = data;
          dispatch(updateUsersByLogs(logs));
          // 特殊处理当前登录用户的更新
          logs.forEach((log) => {
            const { uid, action, ...rest } = log;
            if (uid === loginUid && action === "update") {
              const purified = omitBy(rest, isNull);
              dispatch(updateLoginUser(purified));
              console.log("upppp 3", purified, ready, user?.is_admin);

              if (
                !guest &&
                typeof purified.is_admin !== "undefined" &&
                ready &&
                user?.is_admin !== purified.is_admin
              ) {
                // ready 之后，登录用户有角色变动
                dispatch(updateRoleChanged(true));
              }
            }
            if (action === "delete") {
              // 同时删掉对应的聊天记录
              dispatch(removeUserSession(uid));
            }
          });
          break;
        }
        case "user_settings":
        case "user_settings_changed": {
          Object.keys(data).forEach((key) => {
            switch (key) {
              case "read_index_groups":
                dispatch(updateReadChannels(data[key]));
                break;
              case "read_index_users":
                dispatch(updateReadUsers(data[key]));
                break;
              case "pinned_chats": {
                const chats = (data as UserSettingsEvent)[key] ?? [];
                dispatch(upsertPinChats({ pins: chats, override: true }));
                break;
              }
              case "add_pin_chats":
                {
                  const pins = (data as UserSettingsChangedEvent).add_pin_chats ?? [];
                  if (pins.length) {
                    dispatch(upsertPinChats({ pins }));
                  }
                }
                break;
              case "remove_pin_chats":
                {
                  const pins = (data as UserSettingsChangedEvent).remove_pin_chats ?? [];
                  if (pins.length) {
                    dispatch(removePinChats(pins));
                  }
                }
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
              case "remove_contacts":
                {
                  const arr = (data as UserSettingsChangedEvent).remove_contacts ?? [];
                  if (arr.length) {
                    dispatch(
                      updateContactStatus(
                        arr.map((uid: number) => {
                          return { uid, status: "" };
                        })
                      )
                    );
                  }
                }
                break;
              case "add_contacts":
                {
                  const arr = (data as UserSettingsChangedEvent).add_contacts ?? [];
                  if (arr.length) {
                    const transformed = arr.map(({ target_uid, info: { status } }) => {
                      return { uid: target_uid, status };
                    });
                    dispatch(updateContactStatus(transformed));
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
              case "burn_after_reading_users":
                {
                  const arr = data[key];
                  if (arr) {
                    dispatch(updateAutoDeleteSetting({ burn_after_reading_users: arr }));
                  }
                }
                break;
              case "burn_after_reading_groups":
                {
                  const arr = data[key];
                  if (arr) {
                    dispatch(updateAutoDeleteSetting({ burn_after_reading_groups: arr }));
                  }
                }
                break;

              default:
                break;
            }
          });
          break;
        }
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
            switch (data.reason) {
              case "login_from_other_device":
                dispatch(resetAuthData());
                toast("kicked from the other device");
                break;
              case "delete_user":
                dispatch(resetAuthData());
                toast("Your account has been deleted");
                break;
              default:
                break;
            }
          }
          break;
        case "related_groups":
          dispatch(fillChannels(data.groups));
          break;
        case "joined_group":
          dispatch(addChannel(data.group));
          break;
        case "group_changed":
          {
            const { gid, ...rest } = data;
            dispatch(updateChannel({ gid, ...rest }));
          }
          break;
        case "user_joined_group": {
          const { gid, uid: uids } = data;
          // 去重
          dispatch(updateChannel({ operation: "add_member", gid, members: uids }));
          break;
        }
        case "user_leaved_group": {
          const { gid, uid: uids } = data;
          if (uids.findIndex((uid) => uid == loginUid) > -1) {
            dispatch(removeChannel(gid));
          } else {
            dispatch(updateChannel({ operation: "remove_member", gid, members: uids }));
          }
          break;
        }
        case "kick_from_group":
          {
            dispatch(removeChannel(data.gid));
            // 同时清掉channel聊天记录
            dispatch(removeChannelSession(data.gid));
          }
          break;
        case "pinned_message_updated":
          dispatch(updatePinMessage(data));
          break;
        case "chat": {
          chatMessageHandler(data, dispatch, {
            afterMid,
            ready,
            loginUid,
            readUsers,
            readChannels
          });
          break;
        }
        default:
          break;
      }
    };
  }, [afterMid, usersVersion, user, guest]);

  const stopStreaming = () => {
    // 先清掉定时器
    console.info("debug SSE: clear timeout at stopStreaming", aliveInter);
    clearTimeout(aliveInter);
    if (SSE) {
      SSE.close();
      SSE = undefined;
    }
    // connectionIsOpen = false;
  };

  useEffect(() => {
    // 确保只执行一次
    if (streamingReady) {
      startStreaming();
    }
    return () => {
      if (streamingReady) {
        console.info("debug SSE: stopStreaming at effect");
        stopStreaming();
      }
    };
  }, [streamingReady]);

  return {
    setStreamingReady,
    startStreaming,
    stopStreaming
  };
}
