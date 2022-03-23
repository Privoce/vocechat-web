// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ContentTypes } from "../../../app/config";
import closeIcon from "../../../assets/icons/close.circle.svg?url";
import pictureIcon from "../../../assets/icons/picture.svg?url";
import { removeReplyingMessage } from "../../../app/slices/message";
import styled from "styled-components";
const Styled = styled.div`
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: #f3f4f6;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  width: 100%;
  padding: 12px 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  .prefix {
    color: #667085;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    em {
      font-weight: bold;
      color: #363f53;
    }
  }
  .content {
    font-weight: 500;
    color: #616161;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 30px;
  }
  .close {
    background: none;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
  }
`;
const renderContent = (data) => {
  const { content_type, content } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = content;
      break;
    case ContentTypes.image:
    case ContentTypes.imageJPG:
      res = <img className="pic" src={pictureIcon} />;
      break;

    default:
      break;
  }
  return res;
};
export default function Replying({ id, mid }) {
  const { msg, contactsData } = useSelector((store) => {
    return { contactsData: store.contacts.byId, msg: store.message[mid] };
  });
  const dispatch = useDispatch();
  const removeReply = () => {
    dispatch(removeReplyingMessage(id));
  };
  if (!msg) return null;
  const { from_uid } = msg;
  const user = contactsData[from_uid];
  return (
    <Styled className="reply">
      <span className="prefix">
        Replying to <em>{user?.name}</em>
      </span>
      <span className="content">{renderContent(msg)}</span>
      <button className="close" onClick={removeReply}>
        <img src={closeIcon} alt="close icon" />
      </button>
    </Styled>
  );
}
