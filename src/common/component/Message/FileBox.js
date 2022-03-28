// import React from 'react'
import styled from "styled-components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from "react-redux";
import { getFileIcon, formatBytes } from "../../utils";
import IconDownload from "../../../assets/icons/download.svg";
dayjs.extend(relativeTime);
const Styled = styled.div`
  padding: 8px;
  background: #f3f4f6;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
  border-radius: 6px;
  width: 370px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  .icon {
    width: 36px;
    height: 48px;
  }
  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    .name {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #1c1c1e;
    }
    .details {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #616161;
      display: flex;
      gap: 16px;
      .from strong {
        font-weight: bold;
      }
    }
  }
  .download {
    white-space: nowrap;
  }
`;
export default function FileBox({
  file_type,
  name,
  size,
  created_at,
  from_uid,
  content,
}) {
  const fromUser = useSelector((store) => store.contacts.byId[from_uid]);
  const icon = getFileIcon(file_type, name);
  if (!content || !fromUser || !name) return null;
  console.log("file content", content, name);
  return (
    <Styled>
      {icon}
      <div className="info">
        <span className="name">{name}</span>
        <span className="details">
          <i className="size">{formatBytes(size)}</i>
          <i className="time">{dayjs(created_at).fromNow()}</i>
          <i className="from">
            by <strong>{fromUser.name}</strong>
          </i>
        </span>
      </div>
      <a className="download" download={name} href={content}>
        <IconDownload />
      </a>
    </Styled>
  );
}
