import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styled from "./styled";
import Session from "./Session";
import DeleteChannelConfirmModal from "../../settingChannel/DeleteConfirmModal";
import InviteModal from "../../../common/component/InviteModal";
export default function SessionList({ tempSession = null }) {
  const [deleteId, setDeleteId] = useState(null);
  const [inviteChannelId, setInviteChannelId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const { channelIDs, DMs, readChannels, readUsers, channelMessage, userMessage, loginUid } =
    useSelector((store) => {
      return {
        loginUid: store.authData.uid,
        channelIDs: store.channels.ids,
        DMs: store.userMessage.ids,
        userMessage: store.userMessage.byId,
        channelMessage: store.channelMessage,
        readChannels: store.footprint.readChannels,
        readUsers: store.footprint.readUsers
      };
    });
  useEffect(() => {
    const cSessions = channelIDs.map((id) => {
      const mids = channelMessage[id];
      if (!mids || mids.length == 0) {
        return { mid: null, unreads: 0, id, type: "channel" };
      }
      const mid = [...mids].pop();
      return { key: `channel_${id}`, id, mid, type: "channel" };
    });
    const uSessions = DMs.map((id) => {
      const mids = userMessage[id];
      if (!mids || mids.length == 0) {
        return { mid: null, unreads: 0, id, type: "user" };
      }
      const mid = [...mids].pop();
      return { key: `user_${id}`, type: "user", id, mid };
    });
    const tmps = [...cSessions, ...uSessions].sort((a, b) => {
      return b.mid - a.mid;
    });
    setSessions(tempSession ? [tempSession, ...tmps] : tmps);
  }, [
    channelIDs,
    DMs,
    channelMessage,
    readChannels,
    readUsers,
    loginUid,
    userMessage,
    tempSession
  ]);
  return (
    <>
      <Styled>
        {sessions.map((s) => {
          const { key, type, id, mid } = s;
          return (
            <Session
              key={key}
              type={type}
              id={id}
              mid={mid}
              setInviteChannelId={setInviteChannelId}
              setDeleteChannelId={setDeleteId}
              className="session"
            />
          );
        })}
      </Styled>
      {deleteId && (
        <DeleteChannelConfirmModal
          id={deleteId}
          closeModal={() => {
            setDeleteId(null);
          }}
        />
      )}
      {inviteChannelId && (
        <InviteModal
          type="channel"
          cid={inviteChannelId}
          closeModal={() => {
            setInviteChannelId(null);
          }}
        />
      )}
    </>
  );
}
