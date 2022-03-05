// import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
// import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import StyledWrapper from "./styled";
export default function PreviewMessage({ data = null }) {
  if (!data) return null;
  const { avatar, name, time, content } = data;
  return (
    <StyledWrapper className={`preview`}>
      <div className="avatar">
        <Avatar url={avatar} name={name} />
      </div>
      <div className="details">
        <div className="up">
          <span className="name">{name}</span>
          <i className="time">{dayjs(time).format("YYYY-MM-DD h:mm:ss A")}</i>
        </div>
        <div className={`down`}>{content}</div>
      </div>
    </StyledWrapper>
  );
}
