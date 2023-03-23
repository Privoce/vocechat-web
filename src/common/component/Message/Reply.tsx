import React, { MouseEvent, FC } from "react";
import clsx from "clsx";
import MarkdownRender from "../MarkdownRender";
import { ContentTypes } from "../../../app/config";
import { getFileIcon, isImage } from "../../utils";
import LinkifyText from '../LinkifyText';

import Avatar from "../Avatar";
import { useAppSelector } from "../../../app/store";
import { MessagePayload } from "../../../app/slices/message";
import { useTranslation } from "react-i18next";

const renderContent = (data: MessagePayload) => {

  const { content_type, content, thumbnail, properties } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = (
        <span className="md:truncate md:break-words md:break-all text-gray-800 dark:text-gray-100">
          <LinkifyText text={content} url={false} mentionTextOnly={true} mentionPopOver={false} />
        </span>
      );
      break;
    case ContentTypes.markdown:
      res = (
        <div className="max-h-[152px] overflow-hidden dark:text-gray-100">
          <MarkdownRender content={content} />
        </div>
      );
      break;
    case ContentTypes.file:
      {
        const { content_type = "", name, size } = properties || {};
        const icon = getFileIcon(content_type, name, "w-4 h-5");
        if (isImage(content_type, size)) {
          res = <img className="w-10 h-10 object-cover" src={thumbnail} />;
        } else {
          res = (
            <>
              {icon}
              <span className="ml-1 text-[10px] text-gray-500 dark:text-gray-100">{name}</span>
            </>
          );
        }
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
}

const Reply: FC<ReplyProps> = ({ mid, interactive = true }) => {
  const { t } = useTranslation("chat");
  const { data, users } = useAppSelector((store) => {
    return { data: store.message[mid], users: store.users.byId };
  });
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
  const defaultClass = `flex items-start flex-col md:flex-row p-2 bg-gray-100 dark:bg-gray-900 rounded-lg gap-2 mb-1`;
  if (!data) return <div
    key={mid}
    data-mid={mid}
    className={clsx(defaultClass, 'italic')}
  >{t("reply_msg_del")}</div>;
  const currUser = users[data.from_uid || 0];
  if (!currUser) return null;

  return (
    <div
      key={mid}
      data-mid={mid}
      className={clsx(defaultClass,
        interactive ? "cursor-pointer" : "!bg-transparent"
      )}
      onClick={interactive ? handleClick : undefined}
    >
      <div className="flex items-center gap-1 whitespace-nowrap">
        <Avatar
          width={16}
          height={16}
          className="w-4 h-4 rounded-full"
          src={currUser.avatar}
          name={currUser.name}
        />
        <span className="text-sm text-primary-500">{currUser.name}</span>
      </div>
      <div className={clsx("text-sm flex items-center overflow-hidden", interactive && "relative")}>
        {renderContent(data)}
        {interactive && <div className="absolute top-0 left-0 w-full h-full"></div>}
      </div>
    </div>
  );
};

export default React.memo(Reply, (prevs, nexts) => {
  return prevs.mid == nexts.mid;
});
