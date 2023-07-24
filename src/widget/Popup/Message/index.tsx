import { memo } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { useAppSelector } from "../../../app/store";
import Text from "./Text";
import Image from "./Image";
import { ContentType } from "@/types/message";

dayjs.extend(localizedFormat);

export interface IWidgetMessage {
  mid: number;
  uid: number;
  host?: boolean;
  type?: ContentType;
  thumbnail?: string;
  content: string;
  create_time: number;
  sending: boolean;
}
const Time = ({ time }: { time: number }) => {
  return (
    <time
      itemProp="dateCreated"
      dateTime={new Date(time).toISOString()}
      className="hidden group-hover:inline px-1.5 text-gray-500 text-xs"
    >
      {dayjs.unix(time / 1000).format("LT")}
    </time>
  );
};
const Index = (props: IWidgetMessage) => {
  const { logo } = useAppSelector((store) => store.server);
  const { host = false, type, content, thumbnail = "", uid, create_time, sending } = props;
  let contentContainer = null;
  console.log("render message", type, content);
  switch (type) {
    case "text/plain":
      contentContainer = <Text sending={sending} content={content} host={host} uid={uid} />;
      break;
    case "vocechat/file":
      {
        console.log("image file", content);

        contentContainer = <Image thumbnail={thumbnail} content={content} />;
      }
      break;

    default:
      break;
  }
  return (
    <div
      className={clsx(
        "group flex mb-3",
        host ? "relative justify-start items-start" : "items-center justify-end px-3"
      )}
    >
      {host ? (
        <>
          <div className="w-9 h-9 absolute top-0 left-3">
            <img src={logo} alt="avatar" className="rounded-full  w-9 h-9" />
          </div>
          <div className="pl-14 flex items-center">
            {contentContainer}
            <Time time={create_time} />
          </div>
        </>
      ) : (
        <>
          <Time time={create_time} />
          {contentContainer}
        </>
      )}
    </div>
  );
};

export default memo(Index, (prev, next) => {
  return prev.mid === next.mid;
});
