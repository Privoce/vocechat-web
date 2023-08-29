import { MouseEvent, useEffect, useState } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import clsx from "clsx";

import Operations from "@/components/Voice/Operations";
import IconMicOff from "@/assets/icons/mic.off.svg";
import IconMic from "@/assets/icons/mic.on.svg";
import IconPin from "@/assets/icons/pin.svg";
import { updatePin } from "../../app/slices/voice";
import { useAppSelector } from "../../app/store";
import Avatar from "../../components/Avatar";
import Tooltip from "../../components/Tooltip";
import { ChatContext } from "../../types/common";
import { playAgoraVideo } from "../../utils";

type Props = {
  context: ChatContext;
  id: number;
};

const VoiceFullscreen = ({ id, context }: Props) => {
  const dispatch = useDispatch();
  const [speakingUid, setSpeakingUid] = useState(0);
  const name = useAppSelector(
    (store) => (context == "channel" ? store.channels.byId[id].name : store.users.byId[id].name),
    shallowEqual
  );
  const userData = useAppSelector((store) => store.users.byId, shallowEqual);
  const voicingMembers = useAppSelector((store) => store.voice.voicingMembers, shallowEqual);
  useEffect(() => {
    const ids = voicingMembers.ids;
    ids.forEach((id) => {
      playAgoraVideo(id);
      const { speakingVolume = 0 } = voicingMembers.byId[id];
      const speaking = speakingVolume > 50;
      if (speaking) {
        setSpeakingUid(id);
      }
    });
  }, [voicingMembers]);

  const handleDoubleClick = (evt: MouseEvent<HTMLLIElement>) => {
    const uid = evt.currentTarget.dataset.uid;
    if (uid) {
      dispatch(updatePin({ uid: +uid, action: "pin" }));
    }
  };

  const handlePin = (evt: MouseEvent<HTMLButtonElement>) => {
    const uid = evt.currentTarget.dataset.uid ?? "";
    const action = evt.currentTarget.dataset.action ?? "pin";
    if (action == "unpin") {
      dispatch(updatePin({ uid: +uid, action }));
    } else {
      dispatch(updatePin({ uid: +uid, action: "pin" }));
    }
  };
  // if (!voicingInfo) return null;
  const pinUid = voicingMembers.pin;
  const _name = context == "channel" ? `# ${name}` : `@ ${name}`;
  const members = voicingMembers.ids;
  const membersData = voicingMembers.byId;
  const hasPin = typeof pinUid !== "undefined";
  return (
    <div className="h-full bg-black text-gray-300 flex flex-col justify-between rounded-r-2xl">
      {/* top */}
      <div className="px-7 py-6 flex justify-between">
        <span className="text-sm font-semibold">{_name}</span>
      </div>
      {/* middle */}
      <ul className="flex grow justify-center items-end relative gap-2">
        {members.map((uid) => {
          const curr = userData[uid];
          if (!curr) return null;
          const { muted, speakingVolume = 0, shareScreen } = membersData[uid];
          const speaking = speakingVolume > 50;
          const special = hasPin ? pinUid == uid : uid == speakingUid;
          const disablePin = special && !hasPin;
          return (
            <li
              key={uid}
              data-uid={uid}
              onDoubleClick={handleDoubleClick}
              className={clsx(
                "bg-gray-700 group overflow-hidden",
                special
                  ? "absolute left-0 top-0 w-full h-[calc(100%_-_110px)] flex-center"
                  : "relative border border-gray-600/50 rounded-lg py-1.5 px-12"
              )}
            >
              <div className={clsx("w-20 h-20 flex shrink-0 relative transition-opacity")}>
                {speaking && (
                  <div
                    className={clsx(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full bg-green-500 animate-speaking",
                      special ? "w-[88px] h-[88px]" : "w-[86px] h-[86px]"
                    )}
                  ></div>
                )}
                <Avatar
                  width={80}
                  height={80}
                  className="w-full h-full rounded-full object-cover z-20"
                  src={curr.avatar}
                  name={curr.name}
                  alt="avatar"
                />
              </div>
              {shareScreen ? (
                <div
                  className={clsx(
                    "w-1 h-1 absolute z-40 rounded-full bg-green-700/60",
                    special ? "top-2 left-2" : "top-1 left-1 px-2"
                  )}
                />
              ) : null}
              {!disablePin && (
                <Tooltip tip={"Remove pin"} disabled={!special} placement="right">
                  <button
                    data-uid={uid}
                    data-action={special ? "unpin" : "pin"}
                    role={"button"}
                    onClick={handlePin}
                    className={clsx(
                      "absolute left-1 top-1 z-40 rounded bg-black/50",
                      special ? "px-2 py-0.5" : "px-1 invisible group-hover:visible"
                    )}
                  >
                    <IconPin
                      className={clsx(special ? "w-4 fill-green-600" : "w-3 fill-gray-200")}
                    />
                  </button>
                </Tooltip>
              )}
              <span
                className={clsx(
                  "text-gray-300 bg-black/50 rounded-lg absolute  z-40",
                  special ? "left-2 bottom-2 px-2 py-1 text-sm " : "left-1 bottom-1 p-1 text-xs"
                )}
                title={curr?.name}
              >
                {curr?.name}
              </span>
              <div
                className={clsx(
                  "flex items-center gap-2 absolute z-40 rounded bg-black/50",
                  special ? "bottom-2 right-2  px-2 py-0.5" : "bottom-1 right-1 px-2"
                )}
              >
                {muted ? (
                  <IconMicOff className={clsx("fill-gray-200", special ? "w-4" : "w-3")} />
                ) : (
                  <IconMic className={clsx("fill-gray-200 ", special ? "w-4" : "w-3")} />
                )}
              </div>
              <div
                id={`CAMERA_${uid}`}
                className={clsx(
                  "absolute top-0 left-0 z-30 w-full h-full overflow-hidden m-auto",
                  special ? "" : "rounded"
                )}
              >
                {/* camera placeholder */}
              </div>
            </li>
          );
        })}
      </ul>
      {/* bottom */}
      <div className="py-4 flex justify-center gap-2">
        <Operations id={id} context={context} mode="fullscreen" />
      </div>
    </div>
  );
};

export default VoiceFullscreen;
