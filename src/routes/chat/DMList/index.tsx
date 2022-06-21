import { FC } from "react";
import { getUnreadCount } from "../utils";
import NavItem from "./NavItem";
import { useAppSelector } from "../../../app/store";

interface Props {
  uids: number[];
  setDropFiles: () => void;
}

const DMList: FC<Props> = ({ uids, setDropFiles }) => {
  const { userMessage, messageData, readUsers, loginUid } = useAppSelector((store) => {
    return {
      loginUid: store.authData.uid,
      readUsers: store.footprint.readUsers,
      contactData: store.contacts.byId,
      userMessage: store.userMessage.byId,
      messageData: store.message
    };
  });
  const sessions = uids.map((uid) => {
    const mids = userMessage[uid] || [];
    if (mids.length == 0) {
      return { lastMid: null, unreads: 0, uid };
    }
    const lastMid = [...mids].pop();
    const readIndex = readUsers[uid];
    const { unreads = 0 } = getUnreadCount({
      mids,
      readIndex,
      messageData,
      loginUid
    });

    return { lastMid, unreads, uid };
  });
  // console.log("temp uids", sessions);
  return (
    <>
      {sessions
        .sort((s1, s2) => {
          if (!s1.lastMid) return s2.lastMid - Infinity;
          return s2.lastMid - s1.lastMid;
        })
        .map(({ lastMid, uid, unreads }) => {
          return (
            <NavItem key={uid} uid={uid} mid={lastMid} unreads={unreads} setFiles={setDropFiles} />
          );
        })}
    </>
  );
};

export default DMList;
