import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../app/config";
import { useRenewMutation } from "../../app/services/auth";
import {
  setChannels,
  addChannel,
  deleteChannel,
} from "../../app/slices/channels";
import {
  updateUsersByLogs,
  updateUsersStatus,
} from "../../app/slices/contacts";
import {
  updateToken,
  clearAuthData,
  setUsersVersion,
  setAfterMid,
  updateLoginedUserByLogs,
} from "../../app/slices/auth.data";

import { addChannelMsg } from "../../app/slices/message.channel";
import { addUserMsg } from "../../app/slices/message.user";
const getQueryString = (params = {}) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      sp.append(key, val);
    }
  });
  return sp.toString();
};
const NotificationHub = ({ usersVersion = 0, afterMid = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, refreshToken, user: currUser } = useSelector(
    (store) => store.authData
  );
  const [
    renewToken,
    { data, isSuccess: refreshTokenSuccess },
  ] = useRenewMutation();
  useEffect(() => {
    let sse = null;
    if (token) {
      sse = new EventSource(
        `${BASE_URL}/user/events?${getQueryString({
          "api-key": token,
          users_version: usersVersion,
          after_mid: afterMid,
        })}`
      );
      sse.onopen = () => {
        console.info("sse opened");
      };
      sse.onerror = (err) => {
        switch (err.eventPhase) {
          case EventSource.CLOSED:
          case EventSource.CONNECTING:
            console.log("sse error renew");
            renewToken({ token, refreshToken });
            break;

          default:
            console.error("sse error", err);
            // renewToken({ token, refreshToken });
            break;
        }
      };
      sse.onmessage = (evt) => {
        handleSSEMessage(JSON.parse(evt.data));
      };
    }
    return () => {
      console.log("re-run sse init");
      if (sse) {
        sse.close();
      }
    };
  }, [token, refreshToken, usersVersion, afterMid]);
  useEffect(() => {
    if (refreshTokenSuccess) {
      const { token, refresh_token } = data;
      dispatch(updateToken({ token, refresh_token }));
    }
  }, [refreshTokenSuccess, data]);

  const handleSSEMessage = (data) => {
    const { type } = data;

    switch (type) {
      case "heartbeat":
        console.log("heartbeat");
        break;
      case "users_snapshot":
        {
          console.log("users snapshot");
          const { version } = data;
          dispatch(setUsersVersion({ version }));
        }
        break;
      case "users_log":
        {
          console.log("users change logs");
          const { logs } = data;
          const loginedUserLogs = logs.filter((l) => {
            return l.uid == currUser.uid;
          });
          if (loginedUserLogs.length) {
            // 当前登录用户的变动，及时同步到auth data里
            dispatch(updateLoginedUserByLogs(logs));
          }
          dispatch(updateUsersByLogs(logs));
        }
        break;
      case "users_state":
      case "users_state_changed":
        {
          let { type, ...rest } = data;
          const onlines = type == "users_state_changed" ? [rest] : rest.users;
          dispatch(updateUsersStatus(onlines));
        }
        break;
      case "kick":
        {
          console.log("kicked");
          switch (data.reason) {
            case "login_from_other_device":
              dispatch(clearAuthData());
              navigate("/login");
              toast("kicked from the other device");
              break;
            case "delete_user":
              dispatch(clearAuthData());
              navigate("/login");
              toast("sorry, your account has been deleted");
              break;
            default:
              break;
          }
        }
        break;
      case "related_groups":
        console.log("related group list", data);
        dispatch(setChannels(data.groups));
        break;
      case "joined_group":
        console.log("joined group list", data.group);
        dispatch(addChannel(data.group));
        break;
      case "kick_from_group":
        console.log("kicked from group", data.gid);
        dispatch(deleteChannel(data.gid));
        break;
      case "chat":
        // console.log("chat data", data);
        if (data.gid) {
          // channel msg
          const { gid, ...rest } = data;
          console.log("compare", rest, currUser, rest.from_uid != currUser.uid);
          dispatch(
            addChannelMsg({
              id: gid,
              // 自己发的 就不用标记未读
              unread: rest.from_uid != currUser.uid,
              ...rest,
            })
          );
        } else {
          // user msg
          dispatch(
            addUserMsg({
              id: data.from_uid,
              unread: data.from_uid != currUser.uid,
              ...data,
            })
          );
        }
        // 更新after_mid
        dispatch(setAfterMid({ mid: data.mid }));
        break;

      default:
        console.log("sse event data", data);
        break;
    }
  };
  return null;
};
// function compareToken(prevHub, nextHub) {
//   return prevHub.token === nextHub.token;
// }
export default React.memo(NotificationHub);
