import { FC } from "react";
import HashIcon from "@/assets/icons/channel.svg";
import LockHashIcon from "@/assets/icons/channel.private.svg";

interface Props {
  personal?: boolean;
  muted?: boolean;
  className?: string;
}

const ChannelIcon: FC<Props> = ({ personal = false, muted = false, className = "" }) => {
  return (
    <div className={`flex ${muted ? "!text-gray-400" : ""} ${className}`}>
      {personal ? <LockHashIcon className="dark:fill-gray-300" /> : <HashIcon className="dark:fill-gray-300" />}
    </div>
  );
};

export default ChannelIcon;
