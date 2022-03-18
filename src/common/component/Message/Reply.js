// import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { ContentTypes } from "../../../app/config";
import Avatar from "../Avatar";
const Styled = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: #e5e7eb;
  border-radius: var(--br);
  gap: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
  .user {
    display: flex;
    align-items: center;
    gap: 4px;
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
    .pic {
      display: inherit;
      max-width: 34px;
    }
  }
  /* padding-left: 10px; */
`;
const renderContent = (data) => {
  const { content_type, content, thumbnail } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = content;
      break;
    case ContentTypes.image:
    case ContentTypes.imageJPG:
      res = <img className="pic" src={thumbnail} />;
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
  if (!data) return null;
  const currUser = users[data.from_uid];
  if (!currUser) return null;
  return (
    <Styled className="reply">
      <div className="user">
        <Avatar className="avatar" url={currUser.avatar} name={currUser.name} />
        <span className="name">{currUser.name}</span>
      </div>
      <div className="content">{renderContent(data)}</div>
    </Styled>
  );
}
