import { FC } from "react";
import dayjs from "dayjs";

import { MessagePayload } from "@/app/slices/message";
import { useAppSelector } from "@/app/store";
import { PinnedMessage } from "@/types/channel";
import { normalizeFileMessage } from "../utils";
import Avatar from "./Avatar";
import renderContent from "./Message/renderContent";
import { shallowEqual } from "react-redux";

interface Props {
  data: PinnedMessage;
}

const PinnedMessageView: FC<Props> = ({ data }) => {
  const msgData = useAppSelector((store) => store.message, shallowEqual);
  const usersData = useAppSelector((store) => store.users.byId, shallowEqual);
  // console.log("piiii", data);

  const { mid = 0 } = data;
  const normalized = normalizeFileMessage(data as MessagePayload) || {};

  const { content_type, content, properties, thumbnail = "" } = { ...data, ...normalized };
  const uid = msgData[mid]?.from_uid || 0;
  const created_at = data.created_at ? data.created_at : msgData[mid]?.created_at;
  const { name, avatar } = usersData[uid] ?? {};
  return (
    <div className="w-full relative flex items-start gap-3 p-2 my-2 rounded-lg">
      <div className="rounded-full overflow-hidden w-10 h-10 shrink-0">
        <Avatar width={40} height={40} src={avatar} name={name} />
      </div>
      <div className="w-full flex flex-col items-start gap-1  text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-gray-500">{name}</span>
          {created_at && (
            <time className="text-xs text-gray-400">
              {dayjs(created_at).format("YYYY-MM-DD h:mm:ss A")}
            </time>
          )}
        </div>
        <div className={`select-text text-gray-600 break-all whitespace-pre-wrap dark:text-white`}>
          {renderContent({
            content_type,
            content,
            thumbnail,
            from_uid: uid,
            properties
          })}
        </div>
      </div>
    </div>
  );
};

export default PinnedMessageView;
