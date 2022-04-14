import React from "react";

// import * as linkfy from "linkifyjs";
import Linkit from "react-linkify";

import dayjs from "dayjs";
import Mention from "./Mention";
import MrakdownRender from "../MrakdownRender";
import { getDefaultSize, isImage } from "../../utils";
import FileBox from "../FileBox";
import URLPreview from "./URLPreview";
import reactStringReplace from "react-string-replace";
const renderContent = ({
  from_uid,
  created_at,
  properties,
  content_type,
  content,
  thumbnail,
  edited = false,
}) => {
  let ctn = null;
  switch (content_type) {
    case "text/plain":
      ctn = (
        <>
          <Linkit
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <React.Fragment key={key}>
                <a
                  className="link"
                  target="_blank"
                  href={decoratedHref}
                  key={key}
                  rel="noreferrer"
                >
                  {decoratedText}
                </a>
                <URLPreview url={decoratedHref} />
              </React.Fragment>
            )}
          >
            {reactStringReplace(
              content,
              /(\s{1}\@[0-9]+\s{1})/g,
              (match, idx) => {
                console.log("match", match);
                const uid = match.trim().slice(1);
                return <Mention key={idx} uid={uid} />;
              }
            )}
            {/* {content.replace(/\s{1}\@[1-9]+\s{1}/g,)} */}
            {/* {new RegExp(/\s{1}\@[1-9]+\s{1}/g).exec(content)} */}
          </Linkit>
          {edited && (
            <span
              className="edited"
              title={dayjs(edited).format("YYYY-MM-DD h:mm:ss A")}
            >
              (edited)
            </span>
          )}
        </>
      );
      break;
    case "text/markdown":
      {
        ctn = <MrakdownRender content={content} />;
      }
      break;
    case "rustchat/file":
      {
        const { size, name, file_type } = properties;
        if (isImage(file_type, size)) {
          const { width, height } = getDefaultSize(properties);
          ctn = (
            <img
              className="img preview"
              style={{ width: `${width}px`, height: `${height}px` }}
              data-meta={JSON.stringify({
                width,
                height,
                name,
                file_type,
                size,
              })}
              data-origin={content}
              src={thumbnail || content}
            />
          );
        } else {
          ctn = (
            <FileBox
              from_uid={from_uid}
              created_at={created_at}
              content={content}
              size={size}
              name={name}
              file_type={file_type}
            />
          );
        }
      }
      break;

    default:
      break;
  }
  return ctn;
};

export default renderContent;
