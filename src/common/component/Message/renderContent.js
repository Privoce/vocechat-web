import Linkify from "react-linkify";
import BASE_URL from "../../../app/config";
const renderContent = (type, content) => {
  let ctn = null;
  switch (type) {
    case "text/plain":
      ctn = (
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          {content}
        </Linkify>
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
