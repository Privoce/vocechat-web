import { useEffect } from "react";

import { useAppSelector } from "../app/store";
import getUnreadCount from "../routes/chat/utils";
import { shallowEqual } from "react-redux";

// type Props = {}
let total = 0;
let title = "";
const UnreadTabTip = () => {
  const loginUid = useAppSelector((store) => store.authData.user?.uid ?? 0, shallowEqual);
  const muteChannels = useAppSelector((store) => store.footprint.muteChannels, shallowEqual);
  const muteUsers = useAppSelector((store) => store.footprint.muteUsers, shallowEqual);
  const readChannels = useAppSelector((store) => store.footprint.readChannels, shallowEqual);
  const readUsers = useAppSelector((store) => store.footprint.readUsers, shallowEqual);
  const userData = useAppSelector((store) => store.users.byId, shallowEqual);
  const DMMap = useAppSelector((store) => store.userMessage.byId, shallowEqual);
  const channelMids = useAppSelector((store) => store.channelMessage, shallowEqual);
  const messageData = useAppSelector((store) => store.message, shallowEqual);

  useEffect(() => {
    if (loginUid === 0) {
      if (title) {
        document.title = title;
      }
      return;
    }
    total = 0;
    // dm
    Object.entries(DMMap).forEach(([id, mids]) => {
      if (!muteUsers[+id]) {
        if (userData[+id]) {
          const { unreads = 0 } = getUnreadCount({
            mids,
            readIndex: readUsers[+id],
            messageData,
            loginUid
          });
          total += unreads;
        }
      }
    });
    // channel
    Object.entries(channelMids).map(([id, mids]) => {
      if (!muteChannels[+id]) {
        const { unreads = 0 } = getUnreadCount({
          mids,
          readIndex: readChannels[+id],
          messageData,
          loginUid
        });
        total += unreads;
      }
    });
    const handler = () => {
      console.log("changed", document.hidden, total);

      if (document.hidden) {
        title = document.title;
        if (total > 0) {
          document.title = `[${total}]-${title}`;
        }
      } else {
        document.title = title;
      }
    };
    document.addEventListener("visibilitychange", handler);
    if (document.hidden && total > 0) {
      document.title = `[${total}]-${title}`;
    }
    return () => {
      document.removeEventListener("visibilitychange", handler);
    };
  }, [
    userData,
    DMMap,
    channelMids,
    readChannels,
    messageData,
    loginUid,
    readUsers,
    muteChannels,
    muteUsers
  ]);
  console.log("unread tip", total);

  return null;
};

export default UnreadTabTip;
