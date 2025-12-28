import { useTranslation } from "react-i18next";
import clsx from "clsx";
import DoubleDown from "./double-down.svg";

import { useAppSelector } from "../../../app/store";
import { ChatContext } from "../../../types/common";
import getUnreadCount from "../utils";
import { memo } from "react";
import { shallowEqual } from "react-redux";

type Props = {
  context: ChatContext;
  id: number;
  scrollToBottom?: () => void;
};

const NewMessageBottomTip = ({ context, id, scrollToBottom }: Props) => {
  const { t } = useTranslation("chat");
  const readIndex = useAppSelector(
    (store) =>
      context == "channel" ? store.footprint.readChannels[id] : store.footprint.readUsers[id],
    shallowEqual
  );
  const mids = useAppSelector(
    (store) => (context == "dm" ? store.userMessage.byId[id] : store.channelMessage[id]),
    shallowEqual
  );
  const loginUid = useAppSelector((store) => store.authData.user?.uid ?? 0, shallowEqual);
  const messageData = useAppSelector((store) => store.message ?? {}, shallowEqual);
  const { unreads = 0 } = getUnreadCount({
    mids,
    readIndex,
    messageData,
    loginUid,
  });

  const style =
    unreads > 0
      ? { background: "linear-gradient(135deg, #3C8CE7 0%, #00EAFF 100%)" }
      : { background: "rgba(156, 163, 175, 0.5)" };

  return (
    <aside
      className={clsx(
        "z-[999] absolute bottom-20 right-4 justify-center text-xs rounded-full text-white flex items-center cursor-pointer",
        unreads > 0 ? "py-1 px-3" : "w-8 h-8"
      )}
      style={style}
      onClick={scrollToBottom}
    >
      {unreads > 0 ? (
        <span>{t("new_msg", { num: unreads })}</span>
      ) : (
        <DoubleDown />
      )}
    </aside>
  );
};

export default memo(NewMessageBottomTip);
