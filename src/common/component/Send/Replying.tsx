import reactStringReplace from "react-string-replace";
import styled from "styled-components";
import Mention from "../Message/Mention";
import { ContentTypes } from "../../../app/config";
import MrakdownRender from "../MrakdownRender";
import closeIcon from "../../../assets/icons/close.circle.svg?url";
import pictureIcon from "../../../assets/icons/picture.svg?url";
import { getFileIcon, isImage } from "../../utils";
import useSendMessage from "../../hook/useSendMessage";
import { useAppSelector } from "../../../app/store";

const Styled = styled.div`
  background-color: #f3f4f6;
  z-index: 999;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  padding: 12px 16px;
  .prefix {
    white-space: nowrap;
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
    white-space: normal;
    color: #616161;
    overflow: hidden;
    padding-right: 30px;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    > .pic {
      width: 40px;
      height: 40px;
      object-fit: cover;
    }
    .md {
      position: relative;
      max-height: 100px;
      overflow: hidden;
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        content: "";
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 63.54%, #f3f4f6 93.09%);
      }
    }
    .icon {
      width: 15px;
      height: 20px;
    }
    .name {
      margin-left: 5px;
      font-size: 10px;
      color: #555;
    }
  }
  .close {
    background: none;
    position: absolute;
    top: 16px;
    right: 16px;
    /* transform: translateY(-50%); */
  }
`;
const renderContent = (data) => {
  const { content_type, content, thumbnail = "", properties } = data;
  let res = null;
  switch (content_type) {
    case ContentTypes.text:
      res = reactStringReplace(content, /(\s{1}@[0-9]+\s{1})/g, (match, idx) => {
        console.log("match", match);
        const uid = match.trim().slice(1);
        return <Mention popover={false} key={idx} uid={uid} />;
      });
      break;
    case ContentTypes.markdown:
      res = (
        <div className="md">
          <MrakdownRender content={content} />
        </div>
      );
      break;
    case ContentTypes.file:
      {
        const { content_type, name, size } = properties;
        const image = isImage(content_type, size);
        // console.log("replying data", content_type, size, image);
        if (image) {
          res = <img className="pic" src={thumbnail || pictureIcon} />;
        } else {
          const icon = getFileIcon(content_type, name);
          res = (
            <>
              {icon}
              <span className="name">{name}</span>
            </>
          );
        }
      }
      break;
    default:
      break;
  }
  // console.log("replying data", data);
  return res;
};

export default function Replying({ context, id, mid }) {
  const { removeReplying } = useSendMessage({ to: id, context });
  const { msg, contactsData } = useAppSelector((store) => {
    return { contactsData: store.contacts.byId, msg: store.message[mid] };
  });
  const removeReply = () => {
    removeReplying();
  };
  if (!msg) return null;
  const { from_uid } = msg;
  const user = contactsData[from_uid];
  return (
    <Styled className="reply">
      <div className="prefix">
        Replying to <em>{user?.name}</em>
      </div>
      <div className="content">{renderContent(msg)}</div>
      <button className="close" onClick={removeReply}>
        <img src={closeIcon} alt="close icon" />
      </button>
    </Styled>
  );
}
