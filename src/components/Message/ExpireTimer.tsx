import { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import IconTimer from "@/assets/icons/timer.svg";
import { removeMessage } from "../../app/slices/message";
import { removeChannelMsg } from "../../app/slices/message.channel";
import { removeUserMsg } from "../../app/slices/message.user";
import { ChatContext } from "../../types/common";

type Props = {
  context: ChatContext;
  contextId: number;
  mid: number;
  expiresIn: number;
  createAt: number;
};

const ExpireTimer: FC<Props> = ({ mid, createAt, expiresIn, context, contextId }) => {
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
    <div className="absolute bottom-1 right-2 text-xs text-gray-400 flex items-center gap-1 font-mono">
      <IconTimer className="w-4 h-4 stroke-slate-400" />
      {formatted_countdown}
    </div>
  );
};

export default ExpireTimer;
