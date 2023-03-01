// @ts-nocheck
import { useState, useEffect, FC } from "react";
import clsx from "clsx";
import { renderPreviewMessage } from "../../chat/utils";
import Avatar from "../../../common/component/Avatar";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/store";
import { fromNowTime } from "../../../common/utils";

interface IProps {
  id: number;
  mid: number;
}
const Session: FC<IProps> = ({ id, mid }) => {
  const [data, setData] = useState<{
    name: string;
    icon: string;
    mid: number;
    is_public: boolean;
  }>();
  const { messageData, userData, channelData } = useAppSelector((store) => {
    return {
      messageData: store.message,
      userData: store.users.byId,
      channelData: store.channels.byId
    };
  });

  useEffect(() => {
    const tmp = channelData[id];
    if (!tmp) return;
    // channel
    const { name, icon = "", is_public } = tmp;
    setData({ name, icon, mid, is_public });
  }, [id, mid, userData, channelData]);
  if (!data) return null;
  const previewMsg = messageData[mid] || {};
  const { name, icon } = data;

  return (
    <li className="session">
      <NavLink className={({ isActive: linkActive }) => clsx(`nav flex gap-2 rounded-lg p-2 w-full md:hover:bg-gray-500/20`, linkActive && "bg-gray-500/20")} to={`/chat/channel/${id}`}>
        <div className="flex shrink-0 w-10 h-10 bg-slate-50 rounded-full overflow-hidden">
          <Avatar width={40} height={40} className="icon" type="channel" name={name} src={icon} />
        </div>
        <div className="w-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className={clsx(`flex items-center gap-2 font-semibold text-sm text-gray-500 dark:text-white truncate`, previewMsg.created_at && "max-w-[190px]")}>
              {name}
            </span>
            <span className="text-xs text-gray-600 max-w-[80px] truncate">
              {fromNowTime(previewMsg.created_at)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 w-36 truncate">{renderPreviewMessage(previewMsg)}</span>
          </div>
        </div>
      </NavLink>
    </li>
  );
};
export default Session;
