import Linkify from "react-linkify";
import dayjs from "dayjs";
import BASE_URL from "../../../app/config";
import MrakdownRender from "../MrakdownRender";
const renderContent = (type, content, edited = false) => {
  let ctn = null;
  switch (type) {
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
      ctn = (
        <img
          className="img preview"
          src={
            content.startsWith("blob")
              ? content
              : `${BASE_URL}/resource/image?id=${encodeURIComponent(content)}`
          }
        />
      );
      break;

    default:
      break;
  }
  return ctn;
};

export default renderContent;
