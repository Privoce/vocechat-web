import Linkify from "react-linkify";
import dayjs from "dayjs";
import MrakdownRender from "../MrakdownRender";
import { getDefaultSize } from "../../utils";
import FileBox from "../FileBox";
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
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a
                target="_blank"
                href={decoratedHref}
                key={key}
                rel="noreferrer"
              >
                {decoratedText}
              </a>
            )}
          >
            {content}
          </Linkify>
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
    case "image/png":
    case "image/jpeg":
      {
        const { name, size, type } = properties;
        const { width, height } = getDefaultSize(properties);
        ctn = (
          <img
            className="img preview"
            style={{ width: `${width}px`, height: `${height}px` }}
            data-meta={JSON.stringify({ width, height, name, type, size })}
            data-origin={content}
            src={thumbnail || content}
          />
        );
      }
      break;
    case "rustchat/file":
      {
        const { size, name, file_type } = properties;
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
      break;

    default:
      break;
  }
  return ctn;
};

export default renderContent;
