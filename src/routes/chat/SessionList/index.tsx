import { FC } from "react";
import { useState, useEffect } from "react";
import Styled from "./styled";
import Session from "./Session";
import DeleteChannelConfirmModal from "../../settingChannel/DeleteConfirmModal";
import InviteModal from "../../../common/component/InviteModal";
import { useAppSelector } from "../../../app/store";
export interface ChatSession {
  key: string;
  type: "user" | "channel";
  id: number;
  mid?: number;
  unread?: number;
}
type Props = {
  tempSession: ChatSession;
};
const SessionList: FC<Props> = ({ tempSession }) => {
  const [deleteId, setDeleteId] = useState<number>();
  const [inviteChannelId, setInviteChannelId] = useState<number>();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const { channelIDs, DMs, readChannels, readUsers, channelMessage, userMessage, loginUid } =
    useAppSelector((store) => {
      return {
        loginUid: store.authData.user?.uid,
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
        return { key: `channel_${id}`, unreads: 0, id, type: "channel" };
      }
      const mid = [...mids].pop();
      return { key: `channel_${id}`, id, mid, type: "channel" };
    });
    const uSessions = DMs.map((id) => {
      const mids = userMessage[id];
      if (!mids || mids.length == 0) {
        return { key: `user_${id}`, unreads: 0, id, type: "user" };
      }
      const mid = [...mids].pop();
      return { key: `user_${id}`, type: "user", id, mid };
    });
    const tmps = [...(cSessions as ChatSession[]), ...(uSessions as ChatSession[])].sort((a, b) => {
      const { mid: aMid = 0 } = a;
      const { mid: bMid = 0 } = b;
      return bMid - aMid;
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
          const { key, type, id, mid = 0 } = s;
          return (
            <Session
              key={key}
              type={type}
              id={id}
              mid={mid}
              setInviteChannelId={setInviteChannelId}
              setDeleteChannelId={setDeleteId}
            />
          );
        })}
      </Styled>
      {!!deleteId && (
        <DeleteChannelConfirmModal
          id={deleteId}
          closeModal={() => {
            setDeleteId(0);
          }}
        />
      )}
      {!!inviteChannelId && (
        <InviteModal
          type="channel"
          cid={inviteChannelId}
          closeModal={() => {
            setInviteChannelId(0);
          }}
        />
      )}
    </>
  );
};
export default SessionList;
