import { useState, useEffect } from "react";
import { getInitials, getInitialsAvatar } from "../utils";
export default function Avatar({ url, name = "unkonw name", ...rest }) {
  const [src, setSrc] = useState(url);
  const handleError = () => {
    const tmp = getInitialsAvatar({
      initials: getInitials(name),
    });
    setSrc(tmp);
  };
  useEffect(() => {
    if (!url) {
      const tmp = getInitialsAvatar({
        initials: getInitials(name),
      });
      setSrc(tmp);
    }
  }, [url, name]);

  return <img src={src} onError={handleError} {...rest} />;
}
