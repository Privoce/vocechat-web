import { FC, memo, useRef } from "react";
import { useState, useEffect } from "react";
import { ViewportList } from "react-viewport-list";
import Session from "./Session";
import DeleteChannelConfirmModal from "../../settingChannel/DeleteConfirmModal";
import InviteModal from "../../../common/component/InviteModal";
import { useAppSelector } from "../../../app/store";
import { ChatContext } from "../../../types/common";
import { PinChatTargetChannel, PinChatTargetUser } from "../../../types/sse";
export interface ChatSession {
  type: ChatContext;
  id: number;
  mid: number;
  unread: number;
}
type Props = {
  tempSession?: ChatSession;
};
const SessionList: FC<Props> = ({ tempSession }) => {
  const ref = useRef<HTMLUListElement | null>(null);
  const [deleteId, setDeleteId] = useState<number>();
  const [inviteChannelId, setInviteChannelId] = useState<number>();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [pinSessions, setPinSessions] = useState<ChatSession[]>([]);
  const { pins, channelIDs, DMs, readChannels, readUsers, channelMessage, userMessage, loginUid } =
    useAppSelector((store) => {
      return {
        pins: store.footprint.pinChats,
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
    // const pinDMs= 
    const getSessionObj = (id: number, type: "dm" | "channel") => {
      const mids = type == "dm" ? userMessage[id] : channelMessage[id];
      if (!mids || mids.length == 0) {
        return { unread: 0, id, type } as ChatSession;
      }
      // 先转换成数字，再排序
      const mid = [...mids].sort((a, b) => +a - +b).pop();
      return { id, mid, type } as ChatSession;
    };
    const pinTmps = pins.map((p) => {
      const { target } = p;
      if ("uid" in target) {
        return getSessionObj((target as PinChatTargetUser).uid, "dm");
      }
      if ("gid" in target) {
        return getSessionObj((target as PinChatTargetChannel).gid, "channel");
      }
      return null;
    }).filter((p) => !!p);
    const channelPinIds = pins.map(p => {
      if (p.target.gid) {
        return p.target.gid;
      }
      return null;

    }).filter(id => !!id);
    const dmPinIds = pins.map(p => {
      if (p.target.uid) {
        return p.target.uid;
      }
      return null;

    }).filter(id => !!id);
    const cSessions = channelIDs.filter(id => {
      return !channelPinIds.includes(id);
    }).map((id) => {
      return getSessionObj(id, "channel");
    });
    const uSessions = DMs.filter(id => {
      return !dmPinIds.includes(id);
    }).map((id) => {
      return getSessionObj(id, "dm");
    });
    const temps = [...(cSessions as ChatSession[]), ...(uSessions as ChatSession[])].sort((a, b) => {
      const { mid: aMid = 0 } = a;
      const { mid: bMid = 0 } = b;
      return bMid - aMid;
    });
    // console.log("before qqqq", temps);
    const newSessions = tempSession ? [tempSession, ...temps] : temps;
    // console.log("qqqq", newSessions);
    setSessions(newSessions);
    setPinSessions(pinTmps);
  }, [
    channelIDs,
    DMs,
    channelMessage,
    readChannels,
    readUsers,
    loginUid,
    userMessage,
    tempSession,
    pins
  ]);

  return (
    <>
      {pinSessions.length ? <ul className="flex flex-col gap-0.5 p-2 bg-primary-500/10">
        {pinSessions.map((p) => {
          const { type, id, mid = 0 } = p;
          const key = `${type}_${id}`;
          return (
            <Session
              key={key}
              type={type}
              pinned={true}
              id={id}
              mid={mid}
              setInviteChannelId={setInviteChannelId}
              setDeleteChannelId={setDeleteId}
            />
          );
        })}
      </ul> : null}
      <ul ref={ref} className="flex flex-1 flex-col gap-0.5 p-2 overflow-auto">
        <ViewportList
          initialPrerender={10}
          viewportRef={ref}
          items={sessions}
        >
          {(s) => {
            const { type, id, mid = 0 } = s;
            const key = `${type}_${id}`;
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
          }}
        </ViewportList>
      </ul>
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
export default memo(SessionList);
