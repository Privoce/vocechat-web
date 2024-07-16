import { FC } from "react";

import ChannelIcon from "@/components/ChannelIcon";
import useFilteredChannels from "@/hooks/useFilteredChannels";
import CheckSign from "@/assets/icons/check.sign.svg";

type Props = {
  select: number;
  updateFilter: (param: { channel?: number }) => void;
};
const Channel: FC<Props> = ({ select = 0, updateFilter }) => {
  const { channels } = useFilteredChannels();
  const handleClick = (gid?: number) => {
    updateFilter({ channel: gid });
  };

  return (
    <div className="rounded-lg p-1 pt-0 bg-white dark:bg-gray-800 overflow-auto max-h-[400px] flex flex-col items-start relative drop-shadow">
      <ul className="w-full flex flex-col gap-4 p-2">
        <li
          className="relative cursor-pointer flex items-center gap-2"
          onClick={handleClick.bind(null, undefined)}
        >
          <ChannelIcon />
          <span className="text-gray-500 dark:text-gray-100 font-semibold text-sm">
            Any Channel
          </span>
          {!select && <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />}
        </li>
        {channels.map(({ gid, is_public, name }) => {
          return (
            <li
              key={gid}
              className="relative cursor-pointer flex items-center gap-2 justify-between"
              onClick={handleClick.bind(null, gid)}
            >
              <ChannelIcon personal={!is_public} />
              <span className="text-gray-500 dark:text-gray-100 font-semibold text-sm flex-1">
                {name}
              </span>
              {select == gid && <CheckSign className="" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Channel;
