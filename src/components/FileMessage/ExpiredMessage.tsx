import React, { useEffect } from "react";
import clsx from "clsx";

import useExpiredResMap from "@/hooks/useExpiredResMap";
import IconAudio from "@/assets/icons/file.audio.svg";
import IconImage from "@/assets/icons/file.image.svg";
import IconUnknown from "@/assets/icons/file.unknown.svg";
import IconVideo from "@/assets/icons/file.video.svg";
import IconInfo from "@/assets/icons/info.svg";

type Props = {
  type?: "file" | "audio" | "image" | "video";
  url?: string;
};
const InfoMap = {
  file: {
    title: "File not Found",
    desc: "File expired or deleted",
    icon: <IconUnknown className="w-9 shrink-0 h-auto grayscale" />
  },
  audio: {
    title: "Audio not Found",
    desc: "Audio expired or deleted",
    icon: <IconAudio className="w-9 shrink-0 h-auto grayscale" />
  },
  image: {
    title: "Image not Found",
    desc: "Image expired or deleted",
    icon: <IconImage className="w-9 shrink-0 h-auto grayscale" />
  },
  video: {
    title: "Video not Found",
    desc: "Video expired or deleted",
    icon: <IconVideo className="w-9 shrink-0 h-auto grayscale" />
  }
};
const ExpiredMessage = ({ type = "file", url = "" }: Props) => {
  const { setExpired } = useExpiredResMap();
  const { title, desc, icon } = InfoMap[type];
  useEffect(() => {
    if (url) {
      setExpired(url);
    }
  }, [url]);

  return (
    <div
      className={clsx(
        `bg-stone-100 dark:bg-stone-900 border box-border md:w-96 rounded-md border-gray-300 dark:border-gray-500`
      )}
    >
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        {icon}
        <div className="flex flex-col gap-1 w-full overflow-hidden">
          <span
            className={clsx(
              "font-semibold text-sm truncate text-gray-800 dark:text-gray-100"
              // error ? "text-red-500" : "text-gray-800 dark:text-gray-100"
            )}
          >
            {title}
          </span>
          <span className="hidden md:flex whitespace-nowrap text-xs text-gray-500 dark:text-gray-300 gap-4">
            <strong>{desc}</strong>
          </span>
        </div>
        <span className="text-red-500 text-xs whitespace-nowrap flex items-center gap-1">
          <IconInfo className="stroke-gray-600 dark:stroke-gray-400 w-6 h-6" />
        </span>
      </div>
    </div>
  );
};

export default ExpiredMessage;
