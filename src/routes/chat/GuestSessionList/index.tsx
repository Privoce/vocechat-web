import { FC } from "react";
import { useState, useEffect } from "react";
import Session from "./Session";
import { useAppSelector } from "../../../app/store";
export interface ChatSession {
  key: string;
  id: number;
  mid?: number;
}
type Props = {};
const SessionList: FC<Props> = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const { channelIDs, readChannels, readUsers, channelMessage, userMessage, loginUid } =
    useAppSelector((store) => {
      return {
        loginUid: store.authData.user?.uid,
        channelIDs: store.channels.ids,
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
      const mid = [...mids].sort().pop();
      return { key: `channel_${id}`, id, mid, type: "channel" };
    });
    const tmps = [...(cSessions as ChatSession[])].sort((a, b) => {
      const { mid: aMid = 0 } = a;
      const { mid: bMid = 0 } = b;
      return bMid - aMid;
    });
    setSessions(tmps);
  }, [channelIDs, channelMessage, readChannels, readUsers, loginUid, userMessage]);

  return (
    <ul className="flex flex-col gap-0.5 p-2 overflow-auto h-[calc(100vh_-_56px_-_38px)]">
      {sessions.map((s) => {
        const { key, id, mid = 0 } = s;
        return <Session key={key} id={id} mid={mid} />;
      })}
    </ul>
  );
};
export default SessionList;
