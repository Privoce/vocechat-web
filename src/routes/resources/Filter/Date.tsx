import { FC } from "react";
import CheckSign from "@/assets/icons/check.sign.svg";


export const Dates = {
  today: {
    title: "Today",
    duration: 2222
  },
  in7d: {
    title: "Last 7 Days"
  },
  in30d: {
    title: "Last 30 Days"
  },
  in3m: {
    title: "Last 3 months"
  },
  in12m: {
    title: "Last 12 months"
  }
};
type Props = {
  select: number;
  updateFilter: (param: { date?: string }) => void;
};
const DateFilter: FC<Props> = ({ select = "", updateFilter }) => {
  const handleClick = (dur?: string) => {
    updateFilter({ date: dur });
  };

  return (
    <div className="p-3 bg-white dark:bg-gray-800 min-w-[200px] overflow-auto rounded-lg flex flex-col items-start relative drop-shadow">
      <ul className="w-full flex flex-col gap-4">
        <li className="relative cursor-pointer flex items-center gap-4 text-gray-500 dark:text-gray-300 font-semibold text-sm" onClick={handleClick.bind(null, undefined)}>
          Any Time
          {!select && <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />}
        </li>
        {Object.entries(Dates).map(([_key, { title }]) => {
          return (
            <li key={title} className="relative cursor-pointer flex items-center gap-4 text-gray-500 dark:text-gray-300 font-semibold text-sm" onClick={handleClick.bind(null, _key)}>
              {title}
              {select == _key && <CheckSign className="absolute right-0 -top-1/2 -translate-y-1/2" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default DateFilter;
