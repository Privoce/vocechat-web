import { FC } from "react";

import CheckSign from "@/assets/icons/check.sign.svg";

export const Dates = {
  Day1: {
    title: "Last 24 Hours",
  },
  Day7: {
    title: "Last 7 Days",
  },
  Day30: {
    title: "Last 30 Days",
  },
  Day90: {
    title: "Last 3 months",
  },
  Day180: {
    title: "Last 6 months",
  },
};
type Props = {
  select: number;
  updateFilter: (param: { creation_time_type?: string }) => void;
};
const DateFilter: FC<Props> = ({ select = "", updateFilter }) => {
  const handleClick = (dur?: string) => {
    updateFilter({ creation_time_type: dur });
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-800 min-w-[200px] overflow-auto rounded-lg flex flex-col items-start relative drop-shadow">
      <ul className="w-full flex flex-col gap-4">
        <li
          className="relative cursor-pointer flex items-center gap-4 text-gray-500 dark:text-gray-300 font-semibold text-sm"
          onClick={handleClick.bind(null, undefined)}
        >
          Any Time
          {!select && <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />}
        </li>
        {Object.entries(Dates).map(([_key, { title }]) => {
          return (
            <li
              key={title}
              className="relative cursor-pointer flex items-center gap-4 text-gray-500 dark:text-gray-300 font-semibold text-sm"
              onClick={handleClick.bind(null, _key)}
            >
              {title}
              {select == _key && (
                <CheckSign className="absolute right-0 -top-1/2 -translate-y-1/2" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default DateFilter;
