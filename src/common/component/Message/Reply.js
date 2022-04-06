// import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ContentTypes } from "../../../app/config";
import { getFileIcon } from "../../utils";
import Avatar from "../Avatar";
const Styled = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px;
  background: #e5e7eb;
  border-radius: var(--br);
  gap: 8px;

  margin-bottom: 4px;
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
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      word-break: break-all;
    }
    .pic {
      display: inherit;
      max-width: 34px;
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
  /* padding-left: 10px; */
`;
const renderContent = (data) => {
  const { content_type, content, thumbnail, properties } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = <span className="txt"> {content}</span>;
      break;
    case ContentTypes.markdown:
      res = <span className="txt">[markdown]</span>;
      break;
    case ContentTypes.image:
    case ContentTypes.imageJPG:
      res = <img className="pic" src={thumbnail} />;
      break;
    case ContentTypes.file:
      {
        const { file_type, name } = properties;
        const icon = getFileIcon(file_type, name);
        res = (
          <>
            {icon}
            <span className="file_name">{name}</span>
          </>
        );
      }
      break;

    default:
      break;
  }
  return res;
};
export default function Reply({ mid }) {
  const { data, users } = useSelector((store) => {
    return { data: store.message[mid], users: store.contacts.byId };
  });
  const handleClick = (evt) => {
    const { mid } = evt.currentTarget.dataset;
    const msgEle = document.querySelector(`[data-msg-mid='${mid}']`);
    if (msgEle) {
      msgEle.dataset.highlight = true;
      msgEle.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        console.log("scroll view", msgEle);
        msgEle.dataset.highlight = false;
      }, 3000);
    }
  };
  if (!data) return null;
  const currUser = users[data.from_uid];
  if (!currUser) return null;
  return (
    <Styled data-mid={mid} className="reply" onClick={handleClick}>
      <div className="user">
        <Avatar className="avatar" url={currUser.avatar} name={currUser.name} />
        <span className="name">{currUser.name}</span>
      </div>
      <div className="content">{renderContent(data)}</div>
    </Styled>
  );
}
