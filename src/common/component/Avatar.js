import { useState, useEffect, memo } from "react";
import { getInitials, getInitialsAvatar } from "../utils";
const Avatar = ({ url = "", name = "unkonw name", type = "user", ...rest }) => {
  // console.log("avatar url", url);
  const [src, setSrc] = useState("");
  const handleError = (err) => {
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

export default memo(Avatar, (prevs, nexts) => {
  // const prevKey = prevs.url + prevs.name;
  // const nextKey = nexts.url + nexts.name;
  // return prevKey == nextKey;
  return prevs.url == nexts.url;
});
