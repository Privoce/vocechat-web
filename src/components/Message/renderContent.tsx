// import React from "react";
import dayjs from "dayjs";
import i18n from "@/i18n";
import { ContentTypes } from "@/app/config";
import ForwardedMessage from "./ForwardedMessage";
import MarkdownRender from "../MarkdownRender";
import FileMessage from "../FileMessage";
import { ContentType } from "@/types/message";
import LinkifyText from '../LinkifyText';
import VoiceMessage from "../VoiceMessage";
import { ChatContext } from "@/types/common";

type Props = {
  context: ChatContext;
  to?: number;
  from_uid?: number;
  created_at?: number;
  properties?: object;
  content_type: ContentType;
  content: string;
  download?: string;
  thumbnail?: string;
  edited?: boolean | number;
};
const renderContent = ({
  context,
  to = 0,
  from_uid = 0,
  created_at,
  properties,
  content_type,
  content,
  download,
  thumbnail,
  edited = false
}: Props) => {
  let ctn = null;
  switch (content_type) {
    case ContentTypes.text:
      ctn = (
        <>
          <LinkifyText text={content} cid={to} />
          {edited && (
            <span className="ml-1 text-gray-500 text-[10px]" title={dayjs(+edited).format("YYYY-MM-DD h:mm:ss A")}>
              ({i18n.t("edited", { ns: "chat" })})
            </span>
          )}
        </>
      );
      break;
    case ContentTypes.markdown:
      {
        ctn = <MarkdownRender content={content} />;
      }
      break;
    case ContentTypes.audio:
      {
        // const { url, secure_url } = properties; todo
        ctn = <VoiceMessage file_path={content} />;
      }
      break;
    case ContentTypes.file:
      {
        // const { size, name, file_type } = properties;
        ctn = (
          <FileMessage
            properties={properties}
            context={context}
            to={to}
            download={download}
            thumbnail={thumbnail}
            from_uid={from_uid}
            created_at={created_at}
            content={content}
          />
        );
      }
      break;
    case ContentTypes.archive:
      {
        // const { size, name, file_type } = properties;
        ctn = (
          <ForwardedMessage
            properties={properties}
            context={context}
            to={to}
            from_uid={from_uid}
            created_at={created_at}
            id={content}
            thumbnail={thumbnail}
          />
        );
      }
      break;

    default:
      break;
  }
  return ctn;
};

export default renderContent;
