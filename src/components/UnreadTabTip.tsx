import { useEffect } from "react";

import { useAppSelector } from "../app/store";
import getUnreadCount from "../routes/chat/utils";

// type Props = {}
let total = 0;
let title = "";
const UnreadTabTip = () => {
  const {
    muteChannels,
    muteUsers,
    userData,
    dmMids,
    channelMids,
    messageData,
    readChannels,
    readUsers,
    loginUid
  } = useAppSelector((store) => {
    return {
      userData: store.users.byId,
      dmMids: store.userMessage.byId,
      channelMids: store.channelMessage,
      messageData: store.message,
      readChannels: store.footprint.readChannels,
      readUsers: store.footprint.readUsers,
      muteChannels: store.footprint.muteChannels,
      muteUsers: store.footprint.muteUsers,
      loginUid: store.authData.user?.uid ?? 0
    };
  });

  useEffect(() => {
    if (loginUid === 0) {
      if (title) {
        document.title = title;
      }
      return;
    }
    total = 0;
    // dm
    Object.entries(dmMids).forEach(([id, mids]) => {
      if (!muteUsers[id]) {
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
      if (!muteChannels[id]) {
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
    dmMids,
    channelMids,
    readChannels,
    messageData,
    loginUid,
    readUsers,
    muteChannels,
    muteUsers
  ]);

  return null;
};

export default UnreadTabTip;
