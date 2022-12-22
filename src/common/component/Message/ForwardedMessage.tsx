import { useEffect, useState, FC, ReactElement } from "react";
import styled from "styled-components";
import StyledMsg from "./styled";
import renderContent from "./renderContent";
import Avatar from "../Avatar";
import IconForward from "../../../assets/icons/forward.svg";
import useNormalizeMessage from "../../hook/useNormalizeMessage";
import { useTranslation } from "react-i18next";

const StyledForward = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: var(--br);
  background-color: #f4f4f5;
  > .tip {
    padding: 8px 8px 0 8px;
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
type Props = {
  context: "user" | "channel";
  to: number;
  from_uid: number;
  id: string;
};
const ForwardedMessage: FC<Props> = ({ context, to, from_uid, id }) => {
  const { t } = useTranslation();
  const { normalizeMessage, messages } = useNormalizeMessage();
  const [forwards, setForwards] = useState<ReactElement | null>(null);
  useEffect(() => {
    if (id) {
      normalizeMessage(id);
    }
  }, [id]);

  useEffect(() => {
    if (messages) {
      const forward_mids = messages.map(({ from_mid }) => from_mid) || [];
      // console.log("fff", messages);
      setForwards(
        <StyledForward data-forwarded-mids={forward_mids.join(",")}>
          <h4 className="tip">
            <IconForward className="icon" />
            {t("action.forward")}
          </h4>
          <div className="list">
            {messages.map((msg, idx) => {
              const { user = {}, download, content, content_type, properties, thumbnail } = msg;
              return (
                <StyledMsg className="archive" key={idx}>
                  {user && (
                    <div className="avatar">
                      <Avatar width={24} height={24} src={user.avatar} name={user.name} />
                    </div>
                  )}
                  <div className="details">
                    <div className="up">
                      <span className="name">{user?.name || "Deleted User"}</span>
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
                        thumbnail
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
  if (!id) return null;

  return forwards;
};

export default ForwardedMessage;
