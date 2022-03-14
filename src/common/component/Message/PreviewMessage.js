// import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import renderContent from "./renderContent";
import Avatar from "../Avatar";
import StyledWrapper from "./styled";
import { useSelector } from "react-redux";
export default function PreviewMessage({ mid = 0 }) {
  const { msg, contactsData } = useSelector((store) => {
    return { msg: store.message[mid], contactsData: store.contacts.byId };
  });
  if (!msg) return null;
  const { from_uid, created_at, content_type, content } = msg;
  const { name, avatar } = contactsData[from_uid];
  return (
    <StyledWrapper className={`preview`}>
      <div className="avatar">
        <Avatar url={avatar} name={name} />
      </div>
      <div className="details">
        <div className="up">
          <span className="name">{name}</span>
          <i className="time">
            {dayjs(created_at).format("YYYY-MM-DD h:mm:ss A")}
          </i>
        </div>
        <div className={`down`}>{renderContent(content_type, content)}</div>
      </div>
    </StyledWrapper>
  );
}
