import { useEffect, useState } from "react";
import dayjs from "dayjs";

import styled from "styled-components";
import StyledMsg from "./styled";
import renderContent from "./renderContent";
import Avatar from "../Avatar";
import IconForward from "../../../assets/icons/forward.svg";
import useNormalizeMessage from "../../hook/useNormalizeMessage";
const StyledForward = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--br);
  background-color: #f4f4f5;
  padding: 8px;
  > .tip {
    display: flex;
    align-items: center;
    gap: 4px;
    .icon {
      width: 16px;
      height: 16px;
      path {
        fill: #98a2b3;
      }
    }
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #98a2b3;
  }
`;
const ForwardedMessage = ({ context, to, from_uid, id }) => {
  const { normalizeMessage, messages } = useNormalizeMessage();
  const [forwards, setForwards] = useState(null);
  useEffect(() => {
    if (id) {
      normalizeMessage(id);
    }
  }, [id]);

  useEffect(() => {
    if (messages) {
      const forward_mids = messages.map(({ from_mid }) => from_mid) || [];

      setForwards(
        <StyledForward data-forwarded-mids={forward_mids.join(",")}>
          <h4 className="tip">
            <IconForward className="icon" />
            Forwarded
          </h4>
          <div className="list">
            {messages.map((msg, idx) => {
              const {
                user = {},
                created_at,
                download,
                content,
                content_type,
                properties,
                thumbnail,
              } = msg;
              return (
                <StyledMsg key={idx}>
                  {user && (
                    <div className="avatar">
                      <Avatar url={user.avatar} name={user.name} />
                    </div>
                  )}
                  <div className="details">
                    <div className="up">
                      <span className="name">{user?.name}</span>
                      <i className="time">
                        {dayjs(created_at).format("YYYY-MM-DD h:mm:ss A")}
                      </i>
                    </div>
                    <div className="down">
                      {renderContent({
                        download,
                        context,
                        to,
                        from_uid,
                        content,
                        content_type,
                        properties,
                        thumbnail,
                      })}
                    </div>
                  </div>
                </StyledMsg>
              );
            })}
          </div>
        </StyledForward>
      );
    }
  }, [messages, context, to, from_uid]);

  console.log("archive data", messages);
  if (!id) return null;

  return forwards;
};

export default ForwardedMessage;
