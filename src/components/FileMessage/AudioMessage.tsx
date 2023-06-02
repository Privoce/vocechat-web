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
        "md:w-96 flex flex-col gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-500 overflow-hidden bg-stone-100 dark:bg-stone-900"
        // error ? "border-red-100 dark:border-red-900/50" : "border-gray-300 dark:border-gray-500"
      )}
    >
      <div className="flex justify-between z-30 overflow-hidden">
        <div className="flex gap-2 ">
          <IconAudio className={clsx("w-9 h-auto", error && "grayscale")} />
          <div className="flex flex-col gap-1 text-sm text-gray-900 dark:text-gray-100">
            <span title={name} className={clsx("font-bold truncate w-[240px]")}>
              {error ? "File not Found" : name}
            </span>
            <span className="text-gray-400">{error ? "File expired or deleted" : _size}</span>
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
