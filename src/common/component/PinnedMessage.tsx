import dayjs from "dayjs";
import renderContent from "./Message/renderContent";
import Avatar from "./Avatar";
import StyledWrapper from "./Message/styled";
import { useAppSelector } from "../../app/store";
import { FC } from "react";
import { PinnedMessage } from "../../types/channel";
import { normalizeFileMessage } from "../utils";
import { MessagePayload } from "../../app/slices/message";

interface Props {
  data: PinnedMessage
}

const PinnedMessageView: FC<Props> = ({ data }) => {
  const { usersData } = useAppSelector((store) => {
    return { usersData: store.users.byId };
  });
  const { created_by = 0 } = data;
  const normalized = normalizeFileMessage(data as MessagePayload) || {};
  console.log("nnnn", normalized);

  const { created_at, content_type, content, properties, thumbnail = "" } = { ...data, ...normalized };
  const { name, avatar } = usersData[created_by] ?? {};
  return (
    <StyledWrapper className={`preview`}>
      <div className="avatar">
        <Avatar width={40} height={40} src={avatar} name={name} />
      </div>
      <div className="details">
        <div className="up">
          <span className="name">{name}</span>
          <i className="time">{dayjs(created_at).format("YYYY-MM-DD h:mm:ss A")}</i>
        </div>
        <div className={`down`}>
          {renderContent({
            content_type,
            content,
            thumbnail,
            from_uid: created_by,
            properties
          })}
        </div>
      </div>
    </StyledWrapper>
  );
};

export default PinnedMessageView;
