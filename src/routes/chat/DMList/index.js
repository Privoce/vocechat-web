// import React from "react";
import { useSelector } from "react-redux";

import { getUnreadCount } from "../utils";

import NavItem from "./NavItem";
export default function DMList({ uids, setDropFiles }) {
  const { userMessage, messageData, readUsers, loginUid } = useSelector(
    (store) => {
      return {
        loginUid: store.authData.uid,
        readUsers: store.footprint.readUsers,
        contactData: store.contacts.byId,
        userMessage: store.userMessage.byId,
        messageData: store.message,
      };
    }
  );
  const sessions = uids.map((uid) => {
    const mids = userMessage[uid];
    const lastMid = [...mids].pop();
    const readIndex = readUsers[uid];
    const unreads = getUnreadCount({ mids, readIndex, messageData, loginUid });

    return { lastMid, unreads, uid };
  });

  return sessions
    .sort((s1, s2) => s2.lastMid - s1.lastMid)
    .map(({ lastMid, uid, unreads }) => {
      return (
        <NavItem
          key={uid}
          uid={uid}
          mid={lastMid}
          unreads={unreads}
          setFiles={setDropFiles}
        />
      );
    });
}
