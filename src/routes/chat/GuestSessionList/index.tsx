import { FC, useEffect, useState } from "react";

import { useAppSelector } from "@/app/store";
import LoginTip from "../Layout/LoginTip";
import Session from "./Session";
import { shallowEqual } from "react-redux";

export interface ChatSession {
  key: string;
  id: number;
  mid?: number;
  type: "channel" | "dm";
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
  const publicBotIds = useAppSelector(
    (store) =>
      Object.values(store.users.byId)
        .filter((u) => !!u.is_bot && !!u.is_public)
        .map((u) => u.uid),
    shallowEqual
  );

  useEffect(() => {
    const cSessions = channelIDs.map((id) => {
      const mids = channelMessage[id];
      if (!mids || mids.length == 0) {
        return { key: `channel_${id}`, id, type: "channel" };
      }
      const mid = [...mids].sort((a, b) => +a - +b).pop();
      return { key: `channel_${id}`, id, mid, type: "channel" };
    });
    // 公开 bot：即使没有任何对话消息也要在会话列表可见
    const botSessions = publicBotIds.map((id) => {
      const mids = userMessage[id];
      if (!mids || mids.length == 0) {
        return { key: `user_${id}`, id, type: "dm" };
      }
      const mid = [...mids].sort((a, b) => +a - +b).pop();
      return { key: `user_${id}`, id, mid, type: "dm" };
    });
    const tmps = [...(cSessions as ChatSession[]), ...(botSessions as ChatSession[])].sort(
      (a, b) => {
        const { mid: aMid = 0 } = a;
        const { mid: bMid = 0 } = b;
        return bMid - aMid;
      }
    );
    setSessions(tmps);
  }, [channelIDs, channelMessage, readChannels, readUsers, loginUid, userMessage, publicBotIds]);

  return (
    <>
      <ul className="flex-1 flex flex-col gap-0.5 p-2 overflow-auto">
        {sessions.map((s) => {
          const { key, id, mid = 0, type } = s;
          return <Session key={key} id={id} mid={mid} type={type} />;
        })}
      </ul>
      <LoginTip placement="session" />
    </>
  );
};
export default SessionList;
