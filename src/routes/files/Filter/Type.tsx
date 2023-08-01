import { FC } from "react";

import CheckSign from "@/assets/icons/check.sign.svg";
import IconAudio from "@/assets/icons/file.audio.svg";
import IconCode from "@/assets/icons/file.code.svg";
import IconDoc from "@/assets/icons/file.doc.svg";
import IconImage from "@/assets/icons/file.image.svg";
import IconPdf from "@/assets/icons/file.pdf.svg";
import IconUnknown from "@/assets/icons/file.unknown.svg";
import IconVideo from "@/assets/icons/file.video.svg";

export const FileTypes = {
  doc: {
    title: "Documents",
    icon: <IconDoc className="w-4 h-auto" />
  },
  pdf: {
    title: "PDFs",
    icon: <IconPdf className="w-4 h-auto" />
  },
  image: {
    title: "Images",
    icon: <IconImage className="w-4 h-auto" />
  },
  audio: {
    title: "Audio",
    icon: <IconAudio className="w-4 h-auto" />
  },
  video: {
    title: "Videos",
    icon: <IconVideo className="w-4 h-auto" />
  },
  code: {
    title: "Code Snippets",
    icon: <IconCode className="w-4 h-auto" />
  },
  unknown: {
    title: "Unknown Files",
    icon: <IconUnknown className="w-4 h-auto" />
  }
};
type Props = {
  select: number;
  updateFilter: (param: { type?: string }) => void;
};
const Type: FC<Props> = ({ select = "", updateFilter }) => {
  const handleClick = (type?: string) => {
    updateFilter({ type });
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-800 min-w-[180px] overflow-auto shadow-md rounded-lg flex flex-col items-start relative">
      <ul className="w-full flex flex-col gap-4">
        <li
          className="relative cursor-pointer flex items-center gap-4 text-gray-500 dark:text-gray-300 font-semibold text-sm"
          onClick={handleClick.bind(null, undefined)}
        >
          Any Type
          {!select && <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />}
        </li>
        {Object.entries(FileTypes).map(([type, { title, icon }]) => {
          return (
            <li
              key={title}
              className="relative cursor-pointer flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 font-semibold"
              onClick={handleClick.bind(null, type)}
            >
              {icon} {title}
              {select == type && (
                <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Type;
