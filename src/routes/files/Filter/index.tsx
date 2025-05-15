import { useState } from "react";
import { useTranslation } from "react-i18next";
import Tippy from "@tippyjs/react";
import clsx from "clsx";

import { useAppSelector } from "@/app/store";
// import Avatar from "@/components/Avatar";
import ArrowDown from "@/assets/icons/arrow.down.svg";
import FilterChannel from "./Channel";
import FilterDate, { Dates } from "./Date";
// import FilterFrom from "./From";
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
    gid: false,
    creation_time_type: false,
    uid: false,
    file_type: false,
  });

  const toggleFilterVisible = (obj: any) => {
    console.log({ obj });

    setFiltersVisible((prev) => {
      return { ...prev, ...obj };
    });
  };

  const handleUpdateFilter = (data: any) => {
    updateFilter(data);
    let _key = Object.keys(data)[0];
    let tmp = {
      [_key]: false,
    };
    toggleFilterVisible(tmp);
  };
  const userMap = useAppSelector((store) => store.users.byId, shallowEqual);
  const channelMap = useAppSelector((store) => store.channels.byId, shallowEqual);

  const { uid, gid, file_type, creation_time_type } = filter;
  const {
    gid: channelVisible,
    creation_time_type: dateVisible,
    file_type: typeVisible,
    uid: fromVisible,
  } = filtersVisible;

  return (
    <div className="flex items-center gap-3">
      {/* <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { uid: false })}
        visible={fromVisible}
        placement="bottom-start"
        content={<FilterFrom select={filter.uid} updateFilter={handleUpdateFilter} />}
      >
        <div className={getClass(uid)} onClick={toggleFilterVisible.bind(null, { uid: true })}>
          {uid && (
            <Avatar
              width={16}
              height={16}
              className="rounded-full w-4 h-4"
              name={userMap[uid].name}
              src={userMap[uid].avatar}
            />
          )}
          <span className="txt">
            {t("from")} {uid && userMap[uid].name}
          </span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy> */}
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { gid: false })}
        visible={channelVisible}
        placement="bottom-start"
        content={<FilterChannel select={filter.gid} updateFilter={handleUpdateFilter} />}
      >
        <div className={getClass(gid)} onClick={toggleFilterVisible.bind(null, { gid: true })}>
          <span className="txt">{gid ? `In ${channelMap[gid].name}` : t("channel")}</span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { file_type: false })}
        visible={typeVisible}
        placement="bottom-start"
        content={<FilterType select={filter.file_type} updateFilter={handleUpdateFilter} />}
      >
        <div
          className={getClass(file_type)}
          onClick={toggleFilterVisible.bind(null, { file_type: true })}
        >
          <span className="txt">{file_type ? FileTypes[file_type].title : t("type")}</span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { creation_time_type: false })}
        visible={dateVisible}
        placement="bottom-start"
        content={
          <FilterDate select={filter.creation_time_type} updateFilter={handleUpdateFilter} />
        }
      >
        <div
          className={getClass(creation_time_type)}
          onClick={toggleFilterVisible.bind(null, { creation_time_type: true })}
        >
          <span className="txt">
            {creation_time_type ? Dates[creation_time_type].title : t("date")}
          </span>
          <ArrowDown className="dark:stroke-gray-100" />
        </div>
      </Tippy>
    </div>
  );
}
