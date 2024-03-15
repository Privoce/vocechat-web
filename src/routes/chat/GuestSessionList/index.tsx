import { FC, useEffect, useState } from "react";

import { useAppSelector } from "@/app/store";
import LoginTip from "../Layout/LoginTip";
import Session from "./Session";
import { shallowEqual } from "react-redux";

export interface ChatSession {
  key: string;
  id: number;
  mid?: number;
}
type Props = Record<string, never>;
const SessionList: FC<Props> = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const readChannels = useAppSelector((store) => store.footprint.readChannels, shallowEqual);
  const readUsers = useAppSelector((store) => store.footprint.readUsers, shallowEqual);
  const loginUid = useAppSelector((store) => store.authData.user?.uid, shallowEqual);
  const channelIDs = useAppSelector((store) => store.channels.ids, shallowEqual);
  const channelMessage = useAppSelector((store) => store.channelMessage, shallowEqual);
  const userMessage = useAppSelector((store) => store.userMessage.byId, shallowEqual);

  useEffect(() => {
    const cSessions = channelIDs.map((id) => {
      const mids = channelMessage[id];
      if (!mids || mids.length == 0) {
        return { key: `channel_${id}`, unreads: 0, id, type: "channel" };
      }
      const mid = [...mids].sort((a, b) => +a - +b).pop();
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
    <>
      <ul className="flex-1 flex flex-col gap-0.5 p-2 overflow-auto">
        {sessions.map((s) => {
          const { key, id, mid = 0 } = s;
          return <Session key={key} id={id} mid={mid} />;
        })}
      </ul>
      <LoginTip placement="session" />
    </>
  );
};
export default SessionList;
