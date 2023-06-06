import { FC, useEffect, useState } from "react";
import { LineWobble, Ping } from "@uiball/loaders";

import { getDefaultSize, isMobile } from "@/utils";
import ExpiredMessage from "./ExpiredMessage";

type Props = {
  uploading: boolean;
  progress: number;
  thumbnail: string;
  download: string;
  content: string;
  properties: { width: number; height: number };
};

const ImageMessage: FC<Props> = ({
  uploading,
  progress,
  thumbnail,
  download,
  content,
  properties
}) => {
  const url = thumbnail || content;
  const [status, setStatus] = useState<"loading" | "error" | "loaded">("loading");
  const { width = 0, height = 0 } = getDefaultSize(properties, {
    min: 200,
    max: isMobile() ? 300 : 480
  });
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setStatus("loaded");
    };
    img.onerror = () => {
      setStatus("error");
    };
    img.src = url;
  }, [url]);
  if (status == "error") return <ExpiredMessage type="image" />;
  return (
    <div
      className={`relative overflow-hidden`}
      style={{
        width: width ? `${width}px` : "",
        height: height ? `${height}px` : ""
      }}
    >
      {uploading && (
        <div className="absolute left-0 top-0 w-full h-full bg-white/50 flex flex-col justify-center items-center gap-1">
          <Ping size={45} speed={2} color="#555" />
          <span className="text-xs text-gray-500">{progress}%</span>
        </div>
      )}
      {status == "loading" ? (
        <p className="w-full h-full flex-center bg-primary-50/80 dark:bg-primary-900/70">
          <LineWobble />
        </p>
      ) : (
        <img
          className="h-auto w-full cursor-zoom-in object-cover preview"
          // style={{
          //   width: width ? `${width}px` : "",
          //   height: height ? `${height}px` : ""
          // }}
          data-meta={JSON.stringify(properties)}
          data-origin={content}
          data-download={download}
          src={url}
        />
      )}
    </div>
  );
};

export default ImageMessage;
