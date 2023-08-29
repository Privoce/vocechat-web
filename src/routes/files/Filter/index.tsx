import { useState } from "react";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
import Avatar from "@/components/Avatar";
import ArrowDown from "@/assets/icons/arrow.down.svg";
import FilterChannel from "./Channel";
import FilterDate, { Dates } from "./Date";
import FilterFrom from "./From";
import FilterType, { FileTypes } from "./Type";
import { shallowEqual } from "react-redux";

const getClass = (selected: boolean) => {
  return clsx(
    `cursor-pointer flex items-center gap-1 md:gap-2 shadow rounded-lg p-1 md:py-2 md:px-3 text-xs text-gray-900 dark:text-gray-200`,
    selected
      ? "text-white bg-primary-400"
      : "border border-solid border-gray-300 dark:border-gray-400 "
  );
};
export default function Filter({ filter, updateFilter }) {
  const { t } = useTranslation("file");
  const [filtersVisible, setFiltersVisible] = useState({
    channel: false,
    date: false,
    from: false,
    type: false
  });

  const toggleFilterVisible = (obj: any) => {
    setFiltersVisible((prev) => {
      return { ...prev, ...obj };
    });
  };

  const handleUpdateFilter = (data: any) => {
    updateFilter(data);
    let _key = Object.keys(data)[0];
    let tmp = {
      [_key]: false
    };
    toggleFilterVisible(tmp);
  };
  const userMap = useAppSelector((store) => store.users.byId, shallowEqual);
  const channelMap = useAppSelector((store) => store.channels.byId, shallowEqual);

  const { from, channel, type, date } = filter;
  const {
    channel: channelVisible,
    date: dateVisible,
    type: typeVisible,
    from: fromVisible
  } = filtersVisible;

  return (
    <div className="flex items-center gap-2">
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { from: false })}
        visible={fromVisible}
        placement="bottom-start"
        content={<FilterFrom select={filter.from} updateFilter={handleUpdateFilter} />}
      >
        <div className={getClass(from)} onClick={toggleFilterVisible.bind(null, { from: true })}>
          {from && (
            <Avatar
              width={16}
              height={16}
              className="rounded-full w-4 h-4"
              name={userMap[from].name}
              src={userMap[from].avatar}
            />
          )}
          <span className="txt">
            {t("from")} {from && userMap[from].name}
          </span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { channel: false })}
        visible={channelVisible}
        placement="bottom-start"
        content={<FilterChannel select={filter.channel} updateFilter={handleUpdateFilter} />}
      >
        <div
          className={getClass(channel)}
          onClick={toggleFilterVisible.bind(null, { channel: true })}
        >
          <span className="txt">{channel ? `In ${channelMap[channel].name}` : t("channel")}</span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { type: false })}
        visible={typeVisible}
        placement="bottom-start"
        content={<FilterType select={filter.type} updateFilter={handleUpdateFilter} />}
      >
        <div className={getClass(type)} onClick={toggleFilterVisible.bind(null, { type: true })}>
          <span className="txt">{type ? FileTypes[type].title : t("type")}</span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { date: false })}
        visible={dateVisible}
        placement="bottom-start"
        content={<FilterDate select={filter.date} updateFilter={handleUpdateFilter} />}
      >
        <div className={getClass(date)} onClick={toggleFilterVisible.bind(null, { date: true })}>
          <span className="txt">{date ? Dates[date].title : t("date")}</span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
    </div>
  );
}
