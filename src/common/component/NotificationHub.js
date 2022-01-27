import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BASE_URL from "../../app/config";
import { addChannelMsg } from "../../app/slices/message.channel";
import { addUserMsg } from "../../app/slices/message.user";

const NotificationHub = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.authData);

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
      case "chat":
        console.log("chat data", data);
        if (data.gid) {
          const { gid, ...rest } = data;
          dispatch(addChannelMsg({ id: gid, ...rest }));
        } else {
          dispatch(addUserMsg({ id: data.from_uid, ...data }));
        }
        break;

      default:
        break;
    }
  };
  return null;
};

export default NotificationHub;
