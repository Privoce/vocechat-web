import { useState } from "react";
import clsx from "clsx";

import IconDownload from "@/assets/icons/download.svg";
import IconAudio from "@/assets/icons/file.audio.svg";
import { formatBytes } from "../../utils";
import { ExpireTip } from "./OtherFileMessage";

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
  return (
    <div
      className={clsx(
        "md:w-96 flex flex-col gap-2 px-3 py-2 rounded-md border overflow-hidden bg-stone-100 dark:bg-stone-900",
        error ? "border-red-100 dark:border-red-900/50" : "border-gray-300 dark:border-gray-500"
      )}
    >
      <div className="flex justify-between z-30 overflow-hidden">
        <div className="flex gap-2 ">
          <IconAudio className="w-9 h-auto" />
          <div className="flex flex-col gap-1 text-sm text-gray-700 dark:text-gray-300">
            <span
              title={name}
              className={clsx("font-bold truncate", error ? "w-56 text-red-500" : " w-[240px]")}
            >
              {name}
            </span>
            <span>{_size}</span>
          </div>
        </div>
        {error ? (
          <ExpireTip />
        ) : (
          <a href={download} className="mt-2 hidden md:block">
            <IconDownload className="fill-gray-500 dark:fill-gray-400" />
          </a>
        )}
      </div>
      {!error && (
        <audio
          onError={handleError}
          src={url}
          onCanPlay={handleCanPlay}
          controls
          className={clsx("w-full object-cover z-10", canPlay ? "visible" : "invisible")}
        />
      )}
    </div>
  );
};

export default AudioMessage;
