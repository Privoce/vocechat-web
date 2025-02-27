import { useState } from "react";
import clsx from "clsx";

import IconAudio from "@/assets/icons/file.audio.svg";
import { formatBytes } from "../../utils";
import ExpiredMessage from "./ExpiredMessage";
import DownloadArea from "./DownloadArea";

type Props = {
  url: string;
  name: string;
  size: number;
  download: string;
};

const AudioMessage = ({ url, name, size, download }: Props) => {
  const [canPlay, setCanPlay] = useState(false);
  const [error, setError] = useState(false);
  const handleCanPlay = () => {
    setCanPlay(true);
  };
  const handleError = () => {
    setError(true);
  };
  const _size = formatBytes(size);
  if (error) return <ExpiredMessage type="audio" url={url} />;
  return (
    <div
      className={clsx(
        "md:w-96 flex flex-col gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-500 overflow-hidden bg-stone-100 dark:bg-stone-900"
      )}
    >
      <div className="flex justify-between z-30 overflow-hidden">
        <div className="flex gap-2 ">
          <IconAudio className={clsx("w-9 h-auto")} />
          <div className="flex flex-col gap-1 text-sm text-gray-900 dark:text-gray-100">
            <span title={name} className={clsx("font-bold truncate w-[240px]")}>
              {name}
            </span>
            <span className="text-gray-400">{_size}</span>
          </div>
        </div>
        <DownloadArea copyLink={download} downloadLink={download} />
      </div>
      <audio
        onError={handleError}
        src={url}
        onCanPlay={handleCanPlay}
        controls
        className={clsx("w-full object-cover z-10", canPlay ? "visible" : "invisible")}
      />
    </div>
  );
};

export default AudioMessage;
