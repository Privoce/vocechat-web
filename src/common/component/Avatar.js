import { useState, useEffect } from "react";
import { getInitials, getInitialsAvatar } from "../utils";
export default function Avatar({
  url = "",
  name = "unkonw name",
  type = "user",
  ...rest
}) {
  console.log("avatar url", url);
  const [src, setSrc] = useState("");
  const handleError = (err) => {
    if (url) {
      console.log("load avatar error", url, err);
    }
    const tmp = getInitialsAvatar({
      initials: getInitials(name),
      background: type == "channel" ? "#EAECF0" : undefined,
      foreground: type == "channel" ? "#475467" : undefined,
    });
    setSrc(tmp);
  };
  useEffect(() => {
    if (!url) {
      const tmp = getInitialsAvatar({
        initials: getInitials(name),
        background: type == "channel" ? "#EAECF0" : undefined,
        foreground: type == "channel" ? "#475467" : undefined,
      });
      setSrc(tmp);
    } else {
      setSrc(url);
    }
  }, [url, name]);
  if (!src) return null;
  return <img src={src} onError={handleError} {...rest} />;
}
