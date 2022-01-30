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
import { clearAuthData } from "../../app/slices/auth.data";

import { addChannelMsg } from "../../app/slices/message.channel";
import { addUserMsg } from "../../app/slices/message.user";

const NotificationHub = ({ token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let sse = null;
    if (token) {
      sse = new EventSource(`${BASE_URL}/user/events?api-key=${token}`);
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
      console.log("re-run see init");
      if (sse) {
        sse.close();
      }
    };
  }, [token]);
  const handleSSEMessage = (data) => {
    const { type } = data;

    switch (type) {
      case "heartbeat":
        console.log("heartbeat");
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
        console.log("joined group list", data);
        dispatch(setChannels(data.groups));
        break;
      case "joined_group":
        console.log("joined group list", data.group);
        dispatch(addChannel(data.group));
        break;
      case "kick_from_group":
        console.log("joined group list", data.gid);
        dispatch(deleteChannel(data.gid));
        break;
      case "chat":
        // console.log("chat data", data);
        if (data.gid) {
          const { gid, ...rest } = data;
          dispatch(addChannelMsg({ id: gid, ...rest }));
        } else {
          dispatch(addUserMsg({ id: data.from_uid, ...data }));
        }
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
