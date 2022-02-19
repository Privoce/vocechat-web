import { useState, useEffect } from "react";
const initialAvatar = ({
  initials = "UK",
  initial_size = 0,
  size = 200,
  foreground = "#fff",
  background = "#4c99e9",
  weight = 400,
  fontFamily = "'Lato', 'Lato-Regular', 'Helvetica Neue'",
}) => {
  const canvas = document.createElement("canvas");
  const width = size;
  const height = size;
  const devicePixelRatio = Math.max(window.devicePixelRatio, 1);
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const context = canvas.getContext("2d");
  context.scale(devicePixelRatio, devicePixelRatio);
  context.rect(0, 0, canvas.width, canvas.height);
  context.fillStyle = background;
  context.fill();
  context.font = `${weight} ${initial_size || height / 2}px ${fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = foreground;
  context.fillText(initials, width / 2, height / 2);

  /* istanbul ignore next */
  return canvas.toDataURL("image/png");
};
const getInitials = (name) => {
  const arr = name.split(" ").filter((n) => !!n);
  return arr
    .map((t) => t[0])
    .join("")
    .toUpperCase();
};
export default function Avatar({ url, name = "unkonw name", ...rest }) {
  const [src, setSrc] = useState(url);
  const handleError = () => {
    const tmp = initialAvatar({
      initials: getInitials(name),
    });
    setSrc(tmp);
  };
  useEffect(() => {
    if (!url) {
      const tmp = initialAvatar({
        initials: getInitials(name),
      });
      setSrc(tmp);
    }
  }, [url, name]);

  return <img src={src} onError={handleError} {...rest} />;
}
