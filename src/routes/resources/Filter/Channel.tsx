import { FC } from "react";
import CheckSign from "../../../assets/icons/check.sign.svg";
import ChannelIcon from "../../../common/component/ChannelIcon";
import Search from "../Search";
import useFilteredChannels from "../../../common/hook/useFilteredChannels";

type Props = {
  select: number;
  updateFilter: (param: { channel?: number }) => void;
};
const Channel: FC<Props> = ({ select = 0, updateFilter }) => {
  const { input, updateInput, channels } = useFilteredChannels();
  const handleClick = (gid?: number) => {
    updateFilter({ channel: gid });
  };

  return (
    <div className="rounded-lg p-1 pt-0 bg-white dark:bg-gray-800 overflow-auto max-h-[400px] flex flex-col items-start relative drop-shadow">
      <div className=" bg-white dark:bg-gray-800 sticky top-0 z-10">
        <Search embed={true} value={input} updateSearchValue={updateInput} />
      </div>
      <ul className="w-full flex flex-col gap-4 p-2">
        <li className="relative cursor-pointer flex items-center gap-2" onClick={handleClick.bind(null, undefined)}>
          <ChannelIcon />
          <span className="text-gray-500 dark:text-gray-100 font-semibold text-sm">Any Channel</span>
          {!select && <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />}
        </li>
        {channels.map(({ gid, is_public, name }) => {
          return (
            <li key={gid} className="relative cursor-pointer flex items-center gap-2" onClick={handleClick.bind(null, gid)}>
              <ChannelIcon personal={!is_public} />
              <span className="text-gray-500 dark:text-gray-100 font-semibold text-sm">{name}</span>
              {select == gid && <CheckSign className="absolute right-0 top-1/2 -translate-y-1/2" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Channel;
