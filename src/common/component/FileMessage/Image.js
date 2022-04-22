// import React from 'react'
import { getDefaultSize } from "../../utils";
export default function Image({
  thumbnail,
  download,
  content,
  properties = {},
}) {
  const { width = 0, height = 0 } = getDefaultSize(properties);
  console.log("image props", properties, width, height);
  return (
    <img
      className="img preview"
      style={{
        width: width ? `${width}px` : "",
        height: height ? `${height}px` : "",
      }}
      data-meta={JSON.stringify(properties)}
      data-origin={content}
      data-download={download}
      src={thumbnail || download || content}
    />
  );
}
