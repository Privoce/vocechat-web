import { useCallback, useEffect } from "react";
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
  resetFootprint,
  updateAutoDeleteSetting,
  updateMute,
  updateReadChannels,
  updateReadUsers,
  updateUsersVersion,
  upsertPinChats
} from "@/app/slices/footprint";
import { resetMessage } from "@/app/slices/message";
import {
  clearChannelMessage,
  removeChannelSession,
  resetChannelMsg
} from "@/app/slices/message.channel";
import { resetFileMessage } from "@/app/slices/message.file";
import { resetReactionMessage } from "@/app/slices/message.reaction";
import { removeUserSession, resetUserMsg } from "@/app/slices/message.user";
import { updateInfo } from "@/app/slices/server";
import { setReady, updateSSEStatus } from "@/app/slices/ui";
import { updateContactStatus, updateUsersByLogs, updateUsersStatus } from "@/app/slices/users";
import { updateCallInfo } from "@/app/slices/voice";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
  ServerEvent,
  UserSettingsChangedEvent,
  UserSettingsEvent,
  UsersStateEvent
} from "@/types/sse";
import { getLocalAuthData, isElectronContext } from "@/utils";
import chatMessageHandler from "./chat.handler";
import { shallowEqual } from "react-redux";

const getQueryString = (params: { [key: string]: string }) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};
let hiddenTime: number = 0;
let SSE: EventSource | undefined;
let ready = false; //是否已完成初始推送
let aliveInter: number | ReturnType<typeof setTimeout> = 0;
const isTabHidden = () => (isElectronContext() ? document.webkitHidden : document.hidden);
export default function useStreaming() {
  const [renewToken] = useRenewMutation();
  const user = useAppSelector((store) => store.authData.user, shallowEqual);
  const guest = useAppSelector((store) => store.authData.guest, shallowEqual);
  const readUsers = useAppSelector((store) => store.footprint.readUsers, shallowEqual);
  const readChannels = useAppSelector((store) => store.footprint.readChannels, shallowEqual);
  const dispatch = useAppDispatch();
  const loginUid = user?.uid || 0;

  const keepAlive = (timeout?: number) => {
    console.info("debug SSE: start new keepalive");
    clearTimeout(aliveInter);
    //  比 15 秒多 5 秒
    const countdown = timeout ?? 20000;
    console.info("debug SSE: clear prev timeout", aliveInter);
    aliveInter = setTimeout(() => {
      console.info("debug SSE: start reconnect");
      // 重启连接
      console.info("debug SSE: stopStreaming at timeout");
      stopStreaming();
      startStreaming();
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
    // 如果 token 快要过期，先 renew
    if (dayjs().isAfter(new Date(expireTime - 20 * 1000))) {
      const resp = await renewToken({ token, refresh_token: refreshToken });
      if ("error" in resp) {
        console.error("renew error from sse", resp.error);
        // 还有网，而且在当前页，则停止循环
        const tabHidden = isTabHidden();
        if (navigator.onLine || !tabHidden) {
          stopStreaming();
        }
        // 返回，开始下次 polling（如果有）
        return;
      } else {
        _token = resp.data.token;
      }
    }
    // 开始初始化
    const params: {
      limit: string;
      "api-key": string;
      after_mid?: string;
      users_version?: string;
    } = {
      limit: "500",
      "api-key": _token
    };
    // 如果 afterMid 是 0，则不传该参数
    if (window.AFTER_MID) {
      params.after_mid = `${window.AFTER_MID}`;
    }
    // 如果 usersVersion 不存在或为 0，则不传该参数
    if (window.USERS_VERSION) {
      params.users_version = `${window.USERS_VERSION}`;
    }
    // 开始初始化推送
    dispatch(updateSSEStatus("connecting"));
    SSE = new EventSource(`${BASE_URL}/user/events?${getQueryString(params)}`);

    SSE.onopen = () => {
      dispatch(updateSSEStatus("connected"));
      ready = false;
    };
    SSE.onerror = (err) => {
      // 断网了 或者 页面隐藏了
      if (!navigator.onLine || isTabHidden()) {
        stopStreaming();
        return;
      }
      const { readyState } = err.target as EventSource;
      console.info("sse error", readyState, err);
      // 连接还处于开启状态 先停掉
      // 无论什么原因，均可安全停掉
      // if (readyState === EventSource.OPEN || readyState === EventSource.CONNECTING) {
      stopStreaming();
      // return;
      // }
      // 重连
      setTimeout(() => {
        startStreaming();
      }, 2000);
    };
    SSE.onmessage = (evt) => {
      // console.log("sse msg");
      const data: ServerEvent = JSON.parse(evt.data);
      const { type } = data;
      switch (type) {
        case "heartbeat":
          keepAlive();
          break;
        case "message_cleared": {
          dispatch(resetFootprint());
          dispatch(resetChannelMsg());
          dispatch(resetUserMsg());
          dispatch(resetMessage());
          dispatch(resetReactionMessage());
          dispatch(resetFileMessage());
          break;
        }
        case "ready":
          ready = true;
          // 有时候，heartbeat 不会发？
          keepAlive();
          dispatch(setReady(true));
          setTimeout(() => {
            toast.dismiss();
          }, 2000);
          break;
        case "server_config_changed": {
          const { type, ...rest } = data;
          const { organization_name, organization_logo, organization_description, ...tmp } = rest;
          const transformed = {
            name: organization_name,
            description: organization_description,
            ...tmp
          };
          const purified = omitBy(transformed, isNull);
          dispatch(updateInfo(purified));
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
            const { type, ...rest } = data;
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
            // 同时清掉 channel 聊天记录
            dispatch(removeChannelSession(data.gid));
          }
          break;
        case "pinned_message_updated":
          dispatch(updatePinMessage(data));
          break;
        case "chat": {
          chatMessageHandler(data, dispatch, {
            afterMid: window.AFTER_MID ?? 0,
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
  }, [user, guest]);

  const stopStreaming = () => {
    // 先清掉定时器
    console.info("debug SSE: clear timeout at stopStreaming", aliveInter);
    clearTimeout(aliveInter);
    if (SSE) {
      SSE.close();
      SSE = undefined;
      dispatch(updateSSEStatus("disconnected"));
      dispatch(setReady(false));
    }
    ready = false;
  };
  useEffect(() => {
    const handleNetworkChange = () => {
      if (!user || guest) return;
      console.info("debug SSE: network changed", navigator.onLine);
      if (navigator.onLine) {
        startStreaming();
      } else {
        stopStreaming();
      }
    };
    const handleWindowVisibilityChange = () => {
      if (!user || guest) return;
      // bug in electron webview: https://github.com/electron/electron/issues/28677
      console.info("debug SSE: visibility changed", isTabHidden());
      const tabHidden = isTabHidden();
      if (tabHidden) {
        // 记录隐藏时间
        hiddenTime = new Date().getTime();
      } else {
        const elapsedTime = (new Date().getTime() - hiddenTime) / 1000;
        // 大于 1 天
        const timeSpan = 24 * 60 * 60;
        // const timeSpan = 5;
        const canReconnect = elapsedTime > timeSpan || !SSE;
        console.info(
          "debug SSE: visibility changed elapsedTime",
          elapsedTime,
          hiddenTime,
          canReconnect,
          !SSE
        );
        // 超过 1 天或者已断线，强制重连
        if (canReconnect) {
          // 设置重连状态
          toast.dismiss();
          toast.loading("Reconnecting...");
          dispatch(updateSSEStatus("reconnecting"));
          if (SSE) {
            // 先停掉
            stopStreaming();
            setTimeout(() => {
              startStreaming();
            }, 1500);
          } else {
            // 直接重连
            startStreaming();
          }
        }
      }
    };
    document.addEventListener("visibilitychange", handleWindowVisibilityChange);
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
      document.removeEventListener("visibilitychange", handleWindowVisibilityChange);
    };
  }, [user, guest]);

  return {
    startStreaming,
    stopStreaming
  };
}
