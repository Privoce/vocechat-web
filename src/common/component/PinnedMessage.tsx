import dayjs from "dayjs";
import renderContent from "./Message/renderContent";
import Avatar from "./Avatar";
import { useAppSelector } from "../../app/store";
import { FC } from "react";
import { PinnedMessage } from "../../types/channel";
import { normalizeFileMessage } from "../utils";
import { MessagePayload } from "../../app/slices/message";

interface Props {
  data: PinnedMessage
}

const PinnedMessageView: FC<Props> = ({ data }) => {
  const { usersData } = useAppSelector((store) => {
    return { usersData: store.users.byId };
  });
  const { created_by = 0 } = data;
  const normalized = normalizeFileMessage(data as MessagePayload) || {};
  console.log("nnnn", normalized);

  const { created_at, content_type, content, properties, thumbnail = "" } = { ...data, ...normalized };
  const { name, avatar } = usersData[created_by] ?? {};
  return (
    <div className="w-full relative flex items-start gap-3 p-2 my-2 rounded-lg">
      <div>
        <Avatar width={40} height={40} src={avatar} name={name} />
      </div>
      <div className="w-full flex flex-col items-start gap-1  text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-gray-500 dark:text-gray-400">{name}</span>
          <time className="text-xs text-gray-400">{dayjs(created_at).format("YYYY-MM-DD h:mm:ss A")}</time>
        </div>
        <div className={`select-text text-gray-600 break-all whitespace-pre-wrap dark:text-white`}>
          {renderContent({
            content_type,
            content,
            thumbnail,
            from_uid: created_by,
            properties
          })}
        </div>
      </div>
    </div>
  );
};

export default PinnedMessageView;
