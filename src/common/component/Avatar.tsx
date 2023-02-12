import { FC, ImgHTMLAttributes, useEffect, useState } from "react";
import { getInitials } from "../utils";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  // className?: string;
  // alt?: string;
  // src?: string;
  width: number;
  height: number;
  name?: string;
  type?: "user" | "channel";
}

function getFontSize(width: number): number {
  if (width <= 16) return 8;
  if (width <= 24) return 12;
  if (width <= 32) return 16;
  if (width <= 40) return 18;
  if (width <= 56) return 22;
  if (width <= 80) return 48;
  return 64;
}

const Avatar: FC<Props> = ({
  src = "",
  name = "Deleted User",
  type = "user",
  width,
  height,
  ...rest
}) => {
  const [avatarSrc, setAvatarSrc] = useState("");
  useEffect(() => {
    if (src) {
      setAvatarSrc(src);
    }
  }, [src]);
  const handleError = () => {
    setAvatarSrc("");
  };
  if (avatarSrc) {
    return <img width={width} height={height} src={avatarSrc} onError={handleError} {...rest} />;
  }
  return (
    <div
      className={`rounded-full flex-center ${rest.className || ""}`}
      style={{
        width,
        height,
        fontSize: getFontSize(width),
        fontWeight: 400,
        fontFamily: "'Lato', 'Lato-Regular', 'Helvetica Neue'",
        background: type === "channel" ? "#EAECF0" : "#4c99e9",
        color: type === "channel" ? "#475467" : "#FFFFFF"
      }}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
