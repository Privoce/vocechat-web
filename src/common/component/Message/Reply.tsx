import React, { MouseEvent, FC } from "react";
import styled from "styled-components";
import reactStringReplace from "react-string-replace";
import MarkdownRender from "../MarkdownRender";
import Mention from "./Mention";
import { ContentTypes } from "../../../app/config";
import { getFileIcon, isImage } from "../../utils";

import Avatar from "../Avatar";
import { useAppSelector } from "../../../app/store";
const Styled = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 8px;
  background: #e5e7eb;
  border-radius: var(--br);
  gap: 8px;
  margin-bottom: 4px;

  &.clickable {
    cursor: pointer;
  }

  .user {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;

    .avatar {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }

    .name {
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      color: #06b6d4;
    }
  }

  .content {
    overflow: hidden;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    display: flex;
    align-items: center;

    .txt {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
    }

    .md {
      position: relative;
      max-height: 152px;
      overflow: hidden;

      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 63.54%, #e5e7eb 93.09%);
      }
    }

    .pic {
      display: inherit;
      width: 40px;
      height: 40px;
      object-fit: cover;
    }

    .icon {
      width: 15px;
      height: 20px;
    }

    .file_name {
      margin-left: 5px;
      font-size: 10px;
      color: #555;
    }
  }
`;

const renderContent = (data) => {
  const { content_type, content, thumbnail, properties } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = (
        <span className="txt">
          {reactStringReplace(
            content,
            // eslint-disable-next-line no-useless-escape
            /(\s{1}\@[0-9]+\s{1})/g,
            (match, idx) => {
              console.log("match", match);
              const uid = match.trim().slice(1);
              return <Mention key={idx} uid={+uid} popover={false} />;
            }
          )}
        </span>
      );
      break;
    case ContentTypes.markdown:
      res = (
        <div className="md">
          <MarkdownRender content={content} />
        </div>
      );
      break;
    case ContentTypes.file:
      {
        const { content_type, name, size } = properties;
        const icon = getFileIcon(content_type, name);
        if (isImage(content_type, size)) {
          res = <img className="pic" src={thumbnail} />;
        } else {
          res = (
            <>
              {icon}
              <span className="file_name">{name}</span>
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
  const { data, users } = useAppSelector((store) => {
    return { data: store.message[mid], users: store.users.byId };
  });
  const handleClick = (evt: MouseEvent<HTMLDivElement>) => {
    const { mid } = evt.currentTarget.dataset;
    const msgEle = document.querySelector<HTMLDivElement>(`[data-msg-mid='${mid}']`);
    if (msgEle) {
      msgEle.dataset.highlight = "true";
      msgEle.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        console.log("scroll view", msgEle);
        msgEle.dataset.highlight = "false";
      }, 3000);
    }
  };
  if (!data) return null;
  const currUser = users[data.from_uid];
  if (!currUser) return null;
  return (
    <Styled
      key={mid}
      data-mid={mid}
      className={`reply ${interactive ? "clickable" : ""}`}
      onClick={interactive ? handleClick : null}
    >
      <div className="user">
        <Avatar className="avatar" url={currUser.avatar} name={currUser.name} />
        <span className="name">{currUser.name}</span>
      </div>
      <div className="content">{renderContent(data)}</div>
    </Styled>
  );
};

export default React.memo(Reply, (prevs, nexts) => {
  return prevs.mid == nexts.mid;
});
