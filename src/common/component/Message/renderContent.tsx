import React from "react";
import Linkit from "react-linkify";
import dayjs from "dayjs";
import reactStringReplace from "react-string-replace";
import { ContentTypes } from "../../../app/config";
import Mention from "./Mention";
import ForwardedMessage from "./ForwardedMessage";
import MarkdownRender from "../MarkdownRender";
import FileMessage from "../FileMessage";
import URLPreview from "./URLPreview";

const renderContent = ({
  context = null,
  to = null,
  from_uid,
  created_at,
  properties,
  content_type,
  content,
  download,
  thumbnail,
  edited = false
}) => {
  let ctn = null;
  switch (content_type) {
    case ContentTypes.text:
      ctn = (
        <>
          <Linkit
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <React.Fragment key={key}>
                <a className="link" target="_blank" href={decoratedHref} key={key} rel="noreferrer">
                  {decoratedText}
                </a>
                {!decoratedHref.startsWith("mailto") && <URLPreview url={decoratedHref} />}
              </React.Fragment>
            )}
          >
            {reactStringReplace(content, /(\s{1}@[0-9]+\s{1})/g, (match, idx) => {
              console.log("match", match);
              const uid = match.trim().slice(1);
              return <Mention key={idx} uid={uid} cid={to} />;
            })}
            {/* {content.replace(/\s{1}\@[1-9]+\s{1}/g,)} */}
            {/* {new RegExp(/\s{1}\@[1-9]+\s{1}/g).exec(content)} */}
          </Linkit>
          {edited && (
            <span className="edited" title={dayjs(edited).format("YYYY-MM-DD h:mm:ss A")}>
              (edited)
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
