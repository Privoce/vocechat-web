import { SyntheticEvent, useState } from "react";
import { Orbit } from "@uiball/loaders";
import clsx from "clsx";

import IconVideo from "@/assets/icons/file.video.svg";
import { formatBytes } from "../../utils";
import ExpiredMessage from "./ExpiredMessage";
import DownloadArea from "./DownloadArea";

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
  if (error) return <ExpiredMessage type="video" url={url} />;
  return (
    <div
      className={clsx(
        "w-60 md:w-96 relative rounded-md border overflow-hidden group border-gray-300 dark:border-gray-500 h-32 md:h-52"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-20 group-hover:hidden"></div>
      <div
        className={clsx(
          "w-full flex justify-between z-30 px-3 py-2 overflow-hidden absolute top-0 left-0"
        )}
      >
        <div className="flex gap-2 ">
          <IconVideo className={clsx("hidden md:block w-9 h-auto")} />
          <div className="flex flex-col gap-1 text-sm dark:text-white text-gray-900">
            <span
              title={name}
              className={clsx(
                "font-bold truncate w-56 md:w-[240px]"
                // error ? "w-56 text-red-500" : "w-56 md:w-[240px]"
              )}
            >
              {name}
            </span>
            <span className="text-gray-400">{_size}</span>
          </div>
        </div>
        <DownloadArea copyLink={download} downloadLink={download} />
      </div>
      {!canPlay && !error ? (
        <div className={tipClass}>
          <Orbit color="#fff" />
        </div>
      ) : null}
      <video
        onPlay={handlePlay}
        onError={handleError}
        onCanPlay={handleCanPlay}
        onPause={handlePause}
        controls={canPlay}
        className="absolute left-0 top-0 w-full h-full object-contain z-10"
      >
        <source src={url} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default VideoMessage;
