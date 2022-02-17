import { useState, useEffect } from "react";
export default function Avatar({ url = "", id = 0, ...rest }) {
  const [src, setSrc] = useState(url);
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = () => {
    setLoaded(true);
  };
  const handleError = () => {
    if (src.indexOf("avatars.dicebear.com") > -1) return;
    setSrc(`https://avatars.dicebear.com/api/adventurer-neutral/${id}.svg`);
  };

  useEffect(() => {
    setLoaded(false);
    setSrc(url);
  }, [url]);

  useEffect(() => {
    const inter = setTimeout(() => {
      if (!loaded) {
        handleError();
      }
    }, 2000);

    return () => {
      clearTimeout(inter);
    };
  }, [loaded]);

  return (
    <img onLoad={handleLoaded} src={src} onError={handleError} {...rest} />
  );
}
