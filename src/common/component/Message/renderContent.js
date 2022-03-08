import Linkify from "react-linkify";
import dayjs from "dayjs";
import BASE_URL from "../../../app/config";
const renderContent = (type, content, edited = false) => {
  let ctn = null;
  switch (type) {
    case "text/plain":
      ctn = (
        <>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
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
    case "image/jpeg":
      ctn = (
        <img
          className="img"
          src={`${BASE_URL}/resource/image?id=${encodeURIComponent(content)}`}
        />
      );
      break;

    default:
      break;
  }
  return ctn;
};

export default renderContent;
