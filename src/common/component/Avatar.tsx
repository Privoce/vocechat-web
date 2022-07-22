import { useState, useEffect, memo, SyntheticEvent, FC } from "react";
import { getInitials, getInitialsAvatar } from "../utils";

interface Props {
  className?: string;
  alt?: string;
  url?: string;
  name?: string;
  type?: "user" | "channel";
}

const Avatar: FC<Props> = ({ url = "", name = "unknown name", type = "user", ...rest }) => {
  // console.log("avatar url", url);
  const [src, setSrc] = useState("");

  const handleError = (err: SyntheticEvent<HTMLImageElement>) => {
    console.log("load avatar error", err);
    const tmp = getInitialsAvatar({
      initials: getInitials(name),
      background: type == "channel" ? "#EAECF0" : undefined,
      foreground: type == "channel" ? "#475467" : undefined
    });
    setSrc(tmp);
  };

  useEffect(() => {
    if (!url) {
      const tmp = getInitialsAvatar({
        initials: getInitials(name),
        background: type == "channel" ? "#EAECF0" : undefined,
        foreground: type == "channel" ? "#475467" : undefined
      });
      setSrc(tmp);
    } else {
      setSrc(url);
    }
  }, [url, name]);
  if (!src) return null;

  return <img src={src} onError={handleError} {...rest} />;
};

export default memo(Avatar, (prev, next) => {
  return prev.url == next.url;
});
