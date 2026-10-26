import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import dayjs from "dayjs";

import IconTimer from "@/assets/icons/timer.svg";
import { removeMessage } from "../../app/slices/message";
import { removeChannelMsg } from "../../app/slices/message.channel";
import { removeUserMsg } from "../../app/slices/message.user";
import { ChatContext } from "../../types/common";
import Tooltip from "../Tooltip";

type Props = {
  context: ChatContext;
  contextId: number;
  mid: number;
  expiresIn: number;
  createAt: number;
  enableRightLayout: boolean;
};

const ExpireTimer: FC<Props> = ({
  enableRightLayout,
  mid,
  createAt,
  expiresIn,
  context,
  contextId
}) => {
  const { t } = useTranslation("setting");
  const [countdown, setCountdown] = useState<number | undefined>();
  const dispatch = useDispatch();
  const clearMsgFromClient = useCallback(() => {
    if (context == "dm") {
      dispatch(removeUserMsg({ mid, id: contextId }));
    } else {
      dispatch(removeChannelMsg({ mid, id: contextId }));
    }
    dispatch(removeMessage(mid));
  }, [context, contextId, mid]);

  useEffect(() => {
    if (expiresIn > 0 && createAt > 0) {
      const expire_time = createAt + expiresIn * 1000;
      if (dayjs().isAfter(new Date(expire_time))) {
        // 已过期，立即删除
        clearMsgFromClient();
      } else {
        // 倒计时
        setCountdown(Math.floor((expire_time - new Date().getTime()) / 1000));
      }
    }
  }, [expiresIn, createAt]);
  useEffect(() => {
    let timer = 0;
    if (typeof countdown !== "undefined") {
      if (countdown > 0) {
        timer = window.setTimeout(() => {
          setCountdown((prev) => {
            const _prev = prev ?? 0;
            return _prev - 1;
          });
        }, 1000);
      } else {
        // 倒计时结束
        console.log("countdown over", mid, countdown);
        clearMsgFromClient();
      }
    }
    return () => {
      if (typeof countdown !== "undefined") {
        clearTimeout(timer);
      }
    };
  }, [countdown, mid]);
  if (!countdown) return null;
  const duration = dayjs.duration(countdown * 1000);
  const day = duration.days() !== 0 ? `${duration.days()} day` : "";
  const hours = duration.hours() !== 0 ? `${duration.hours().toString().padStart(2, "0")}:` : "";
  const minutes =
    duration.minutes() !== 0 ? `${duration.minutes().toString().padStart(2, "0")}:` : "";
  const formatted_countdown = `${day} ${hours}${minutes}${duration
    .seconds()
    .toString()
    .padStart(2, "0")}`;
  return (
    <Tooltip
      tip={formatted_countdown}
      placement="top"
      trigger="mouseenter focus click"
      disabled={false}
      appendTo={() => document.body}
      offset={[0, 8]}
    >
      <button
        type="button"
        aria-label={t("nav.auto_delete_msg")}
        className={clsx(
          "absolute bottom-0 flex h-6 w-6 items-center justify-center rounded bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500",
          enableRightLayout ? "left-1" : "right-1"
        )}
      >
        <IconTimer className="w-4 h-4 stroke-slate-400" aria-hidden="true" />
      </button>
    </Tooltip>
  );
};

export default ExpireTimer;
