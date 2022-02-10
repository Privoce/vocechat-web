import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";

import BASE_URL from "../../app/config";
import {
  setChannels,
  addChannel,
  deleteChannel,
} from "../../app/slices/channels";
import {
  clearAuthData,
  setUsersVersion,
  setAfterMid,
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
const NotificationHub = ({ token, usersVersion = 0, afterMid = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        console.error("sse error", err);
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
  }, [token, usersVersion, afterMid]);
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
          dispatch(addChannelMsg({ id: gid, ...rest }));
        } else {
          // user msg
          dispatch(addUserMsg({ id: data.from_uid, ...data }));
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
function compareToken(prevHub, nextHub) {
  return prevHub.token === nextHub.token;
}
export default React.memo(NotificationHub, compareToken);
