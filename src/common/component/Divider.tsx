import { FC } from "react";
interface Props {
  content: string;
}

const Divider: FC<Props> = ({ content }) => {
  return <div className="relative border-none h-[1px] bg-[#e3e5e8] dark:bg-gray-500 my-6 overflow-visible">
    <span className="p-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-300 font-semibold bg-white dark:bg-[#384250]">{content}</span>
  </div>;
};

export default Divider;
