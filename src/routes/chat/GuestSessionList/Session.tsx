// @ts-nocheck
import { useState, useEffect, FC } from "react";
import dayjs from "dayjs";
import { renderPreviewMessage } from "../../chat/utils";
import Avatar from "../../../common/component/Avatar";
import IconLock from "../../../assets/icons/lock.svg";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/store";

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
  const { name, icon, is_public } = data;

  return (
    <li className="session">
      <NavLink className={`nav`} to={`/chat/channel/${id}`}>
        <div className="icon">
          <Avatar className="icon" type="channel" name={name} url={icon} />
        </div>
        <div className="details">
          <div className="up">
            <span className={`name ${previewMsg.created_at ? "" : "only_title"}`}>
              {name} {!is_public && <IconLock />}
            </span>
            <span className="time">
              {previewMsg.created_at ? dayjs(previewMsg.created_at).fromNow() : null}
            </span>
          </div>
          <div className="down">
            <span className="msg">{renderPreviewMessage(previewMsg)}</span>
          </div>
        </div>
      </NavLink>
    </li>
  );
};
export default Session;
