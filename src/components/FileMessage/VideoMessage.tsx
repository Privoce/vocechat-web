import { SyntheticEvent, useState } from "react";
import { Orbit } from "@uiball/loaders";
import clsx from "clsx";

import IconDownload from "@/assets/icons/download.svg";
import IconVideo from "@/assets/icons/file.video.svg";
import { formatBytes } from "../../utils";
import { ExpireTip } from "./OtherFileMessage";

// import clsx from 'clsx';

type Props = {
  url: string;
  name: string;
  size: number;
  download: string;
};

const VideoMessage = ({ url, name, size, download }: Props) => {
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState(false);
  const _size = formatBytes(size);
  const handlePlay = (evt: SyntheticEvent<HTMLVideoElement>) => {
    const infoEle = evt.currentTarget.previousSibling;
    if (infoEle) {
      (infoEle as HTMLDivElement).classList.add("hidden");
    }
  };
  const handlePause = (evt: SyntheticEvent<HTMLVideoElement>) => {
    const infoEle = evt.currentTarget.previousSibling;
    if (infoEle) {
      (infoEle as HTMLDivElement).classList.remove("hidden");
    }
  };
  const handleCanPlay = () => {
    setCanPlay(true);
  };
  const handleError = () => {
    setCanPlay(false);
    setError(true);
  };
  const tipClass = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  return (
    <div
      className={clsx(
        "w-60 md:w-96 relative rounded-md border overflow-hidden group",
        error
          ? "bg-stone-100 dark:bg-stone-900 border-red-100 dark:border-red-900/50"
          : "border-gray-300 dark:border-gray-500 h-32 md:h-52"
      )}
    >
      {!error && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-20 group-hover:hidden"></div>
      )}
      <div
        className={clsx(
          "w-full flex justify-between z-30 px-3 py-2 overflow-hidden group-hover:bg-black/20",
          error ? "" : "absolute top-0 left-0 "
        )}
      >
        <div className="flex gap-2 ">
          <IconVideo className="hidden md:block w-9 h-auto" />
          <div className="flex flex-col gap-1 text-sm text-white">
            <span
              title={name}
              className={clsx(
                "font-bold truncate",
                error ? "w-56 text-red-500" : "w-56 md:w-[240px]"
              )}
            >
              {name}
            </span>
            <span>{_size}</span>
          </div>
        </div>
        {error ? (
          <ExpireTip />
        ) : (
          <a href={download} className="hidden md:block mt-2">
            <IconDownload className="fill-white" />
          </a>
        )}
      </div>
      {!canPlay && !error ? (
        <div className={tipClass}>
          <Orbit color="#fff" />
        </div>
      ) : null}
      {!error && (
        <video
          onPlay={handlePlay}
          onError={handleError}
          onCanPlay={handleCanPlay}
          onPause={handlePause}
          controls={canPlay}
          className="absolute left-0 top-0 w-full h-full object-cover z-10"
        >
          <source src={url} type="video/mp4"></source>
        </video>
      )}
    </div>
  );
};

export default VideoMessage;
