import React, { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import { ContentTypes } from "@/app/config";
import { MessagePayload } from "@/app/slices/message";
import { useAppSelector } from "@/app/store";
import { ChatContext } from "@/types/common";
import { getFileIcon, isImage } from "@/utils";
import Avatar from "../Avatar";
import LinkifyText from "../LinkifyText";
import MarkdownRender from "../MarkdownRender";
import ForwardedMessage from "./ForwardedMessage";
import { shallowEqual } from "react-redux";

const renderContent = (data: MessagePayload, context: ChatContext, to: number) => {
  const { content_type, content, thumbnail, properties, created_at, from_uid = 0 } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = (
        <span className="max-w-3xl md:break-words md:break-all text-gray-800 dark:text-gray-100 whitespace-break-spaces">
          <LinkifyText
            text={content as string}
            url={false}
            mentionTextOnly={true}
            mentionPopOver={false}
          />
        </span>
      );
      break;
    case ContentTypes.audio:
      res = <span className=" text-primary-400 text-sm">[Voice Message]</span>;
      break;
    case ContentTypes.markdown:
      res = (
        <div className="max-h-[152px] overflow-hidden dark:text-gray-100">
          <MarkdownRender content={content as string} />
        </div>
      );
      break;
    case ContentTypes.file:
      {
        const { content_type = "", name, size } = properties || {};
        const icon = getFileIcon(content_type, name, "w-4 h-5");
        if (isImage(content_type, size)) {
          res = <img className="w-10 h-10 object-cover" src={thumbnail || (content as string)} />;
        } else {
          res = (
            <div className="flex gap-1">
              {icon}
              <span className="text-[10px] text-gray-500 dark:text-gray-100">{name}</span>
            </div>
          );
        }
      }
      break;
    case ContentTypes.archive:
      {
        // const { size, name, file_type } = properties;
        res = (
          <ForwardedMessage
            properties={properties}
            context={context}
            to={to}
            from_uid={from_uid}
            created_at={created_at}
            id={content as string}
            thumbnail={thumbnail}
          />
        );
      }
      break;

    default:
      break;
  }
  return res;
};

interface ReplyProps {
  mid: number;
  interactive?: boolean;
  context: ChatContext;
  to?: number;
}

const Reply: FC<ReplyProps> = ({ mid, interactive = true, context, to = 0 }) => {
  const { t } = useTranslation("chat");
  const users = useAppSelector((store) => store.users.byId, shallowEqual);
  const data = useAppSelector((store) => store.message[mid], shallowEqual);
  const handleClick = (evt: MouseEvent<HTMLDivElement>) => {
    const { mid } = evt.currentTarget.dataset;
    const msgEle = document.querySelector<HTMLDivElement>(`[data-msg-mid='${mid}']`);
    if (msgEle) {
      const _class1 = `md:dark:bg-gray-800`;
      const _class2 = `md:bg-gray-100`;
      msgEle.classList.add(_class1);
      msgEle.classList.add(_class2);
      msgEle.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        msgEle.classList.remove(_class1);
        msgEle.classList.remove(_class2);
      }, 3000);
    }
  };
  const defaultClass = `w-fit flex items-start flex-col md:flex-row p-2 bg-gray-100 dark:bg-gray-900 rounded-lg gap-2 mb-1`;
  if (!data)
    return (
      <div key={mid} data-mid={mid} className={clsx(defaultClass, "italic")}>
        {t("reply_msg_del")}
      </div>
    );
  const currUser = users[data.from_uid || 0];
  if (!currUser) return null;

  return (
    <div
      key={mid}
      data-mid={mid}
      className={clsx(defaultClass, interactive ? "cursor-pointer" : "!bg-transparent")}
      onClick={interactive ? handleClick : undefined}
    >
      <div className="md:flex shrink-0 w-6 h-6 hidden ">
        <Avatar
          width={24}
          height={24}
          className="rounded-full object-cover"
          src={currUser.avatar}
          name={currUser.name}
        />
      </div>
      <div className={clsx("text-sm flex flex-col", interactive && "relative")}>
        <span className="text-sm text-primary-500">{currUser.name}</span>
        {renderContent(data, context, to)}
        {interactive && <div className="absolute top-0 left-0 w-full h-full"></div>}
      </div>
    </div>
  );
};

export default React.memo(Reply, (prev, next) => {
  return prev.mid == next.mid;
});
