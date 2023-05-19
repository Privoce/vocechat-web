import { FC } from "react";
import clsx from "clsx";

interface Props {
  content: string;
  className?: string;
}

const Divider: FC<Props> = ({ content, className = "" }) => {
  return (
    <div
      className={clsx(
        "relative border-none h-[1px] bg-slate-200 dark:bg-gray-500 my-6 overflow-visible",
        className
      )}
    >
      <span className="p-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-300 font-semibold bg-white dark:bg-gray-700">
        {content}
      </span>
    </div>
  );
};

export default Divider;
