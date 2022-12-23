import { useState, useEffect, memo, SyntheticEvent, FC, ImgHTMLAttributes } from "react";
import { getInitials, getInitialsAvatar } from "../utils";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  // className?: string;
  // alt?: string;
  // src?: string;
  name?: string;
  type?: "user" | "channel";
}

const Avatar: FC<Props> = ({ src = "", name = "Deleted User", type = "user", ...rest }) => {
  const [url, setUrl] = useState("");
  const handleError = (err: SyntheticEvent<HTMLImageElement>) => {
    console.error("load avatar error", err);
    const tmp = getInitialsAvatar({
      initials: getInitials(name),
      background: type == "channel" ? "#EAECF0" : undefined,
      foreground: type == "channel" ? "#475467" : undefined
    });
    setUrl(tmp);
  };

  useEffect(() => {
    if (!src) {
      const tmp = getInitialsAvatar({
        initials: getInitials(name),
        background: type == "channel" ? "#EAECF0" : undefined,
        foreground: type == "channel" ? "#475467" : undefined
      });
      setUrl(tmp);
    } else {
      setUrl(src);
    }
  }, [src, name]);
  if (!url) return null;

  return <img src={url} onError={handleError} {...rest} />;
};

export default memo(Avatar, (prev, next) => {
  return prev.src == next.src;
});
