import { useEffect, useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import BASE_URL from "../../../app/config";
import { setReady } from "../../../app/slices/ui";
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
  updateMute,
  updateAutoDeleteSetting
} from "../../../app/slices/footprint";
import { updateUsersByLogs, updateUsersStatus } from "../../../app/slices/users";
import { resetAuthData, updateLoginUser } from "../../../app/slices/auth.data";
import chatMessageHandler from "./chat.handler";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { ServerEvent, UsersStateEvent } from "../../../types/sse";
import { isNull, omitBy } from "lodash";
import { useRenewMutation } from "../../../app/services/auth";
import dayjs from "dayjs";
import { getLocalAuthData } from "../../utils";

const getQueryString = (params: { [key: string]: string }) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};

let SSE: EventSource | undefined = undefined;
let connectionIsOpen = false;
let aliveInter: number = 0;
export default function useStreaming() {
  const opened = useRef(false);
  const [renewToken] = useRenewMutation();
  const [streamingReady, setStreamingReady] = useState(false);
  const {
    authData: { user },
    ui: { ready },
    footprint: { afterMid, usersVersion, readUsers, readChannels }
  } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const loginUid = user?.uid || 0;

  const keepAlive = (timeout?: number) => {
    window.clearTimeout(aliveInter);
    //  比15秒多5秒
    aliveInter = window.setTimeout(() => {
      // 有网的情况再试
      if (navigator.onLine) {
        // 重启连接
        stopStreaming();
        startStreaming();
      }
    }, timeout ?? 20000);
  };
  const startStreaming = useCallback(async () => {
    if (connectionIsOpen) return;
    window.clearTimeout(aliveInter);
    if (SSE && (SSE.readyState === EventSource.OPEN || SSE.readyState === EventSource.CONNECTING))
      return;
    const { token, refreshToken, expireTime } = getLocalAuthData();
    //  token 非空
    if (!token) {
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
      //todo
      opened.current = true;
      connectionIsOpen = true;
    };
    SSE.onerror = (err) => {
      const { readyState } = err.target as EventSource;
      console.error("sse error", readyState, err);
      // 连接还处于开启状态
      if (readyState === EventSource.OPEN || readyState === EventSource.CONNECTING) {
        return;
      }
      // 重连
      // connectionIsOpen = false;
      keepAlive(2000);
    };
    SSE.onmessage = (evt) => {
      const data: ServerEvent = JSON.parse(evt.data);
      const { type } = data;
      switch (type) {
        case "heartbeat":
          keepAlive();
          break;
        case "ready":
          // 有时候，heartbeat不会发？
          keepAlive();
          dispatch(setReady());
          break;
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
            const { uid, action, log_id, ...rest } = log;
            if (uid === loginUid && action === "update") {
              dispatch(updateLoginUser(omitBy(rest, isNull)));
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
          dispatch(removeChannel(data.gid));
          break;
        case "pinned_message_updated":
          dispatch(updatePinMessage(data));
          break;
        case "chat": {
          chatMessageHandler(data, dispatch, {
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
  }, [afterMid, usersVersion]);

  const stopStreaming = () => {
    // 先清掉定时器
    window.clearTimeout(aliveInter);
    if (SSE) {
      SSE.close();
      SSE = undefined;
    }
    connectionIsOpen = false;
  };

  useEffect(() => {
    // 确保只执行一次
    const hasOpened = opened.current;
    if (streamingReady && !hasOpened) {
      startStreaming();
    }
    return () => {
      if (streamingReady && !hasOpened) {
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
