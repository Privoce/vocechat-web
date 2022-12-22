import { useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import Avatar from "../../../common/component/Avatar";
import FilterDate, { Dates } from "./Date";
import FilterFrom from "./From";
import FilterChannel from "./Channel";
import FilterType, { FileTypes } from "./Type";
import ArrowDown from "../../../assets/icons/arrow.down.svg";
import { useAppSelector } from "../../../app/store";
import { useTranslation } from "react-i18next";

const Styled = styled.div`
  /* padding: 20px 0; */
  display: flex;
  align-items: center;
  gap: 8px;
  .filter {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid #d0d5dd;
    box-sizing: border-box;
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: var(--br);
    padding: 7px 12px;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    &.selected {
      border: none;
      color: #fff;
      background-color: #22ccee;
      .arrow path {
        stroke: #fff;
      }
    }
    .avatar {
      width: 16px;
      height: 16px;
      border-radius: 50%;
    }
  }
`;

export default function Filter({ filter, updateFilter }) {
  const { t } = useTranslation("file");
  const [filtersVisible, setFiltersVisible] = useState({
    channel: false,
    date: false,
    from: false,
    type: false
  });

  const toggleFilterVisible = (obj) => {
    setFiltersVisible((prev) => {
      return { ...prev, ...obj };
    });
  };

  const handleUpdateFilter = (data) => {
    updateFilter(data);
    let _key = Object.keys(data)[0];
    let tmp = {
      [_key]: false
    };
    toggleFilterVisible(tmp);
  };
  const { userMap, channelMap } = useAppSelector((store) => {
    return { userMap: store.users.byId, channelMap: store.channels.byId };
  });

  const { from, channel, type, date } = filter;
  const {
    channel: channelVisible,
    date: dateVisible,
    type: typeVisible,
    from: fromVisible
  } = filtersVisible;

  return (
    <Styled>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { from: false })}
        visible={fromVisible}
        placement="bottom-start"
        content={<FilterFrom select={filter.from} updateFilter={handleUpdateFilter} />}
      >
        <div
          className={`filter ${from && "selected"}`}
          onClick={toggleFilterVisible.bind(null, { from: true })}
        >
          {from && (
            <Avatar
              width={16}
              height={16}
              className="avatar"
              name={userMap[from].name}
              src={userMap[from].avatar}
            />
          )}
          <span className="txt">
            {t("from")} {from && userMap[from].name}
          </span>
          <ArrowDown className="arrow" />
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
          className={`filter ${channel && "selected"}`}
          onClick={toggleFilterVisible.bind(null, { channel: true })}
        >
          <span className="txt">{channel ? `In ${channelMap[channel].name}` : t("channel")}</span>
          <ArrowDown className="arrow" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { type: false })}
        visible={typeVisible}
        placement="bottom-start"
        content={<FilterType select={filter.type} updateFilter={handleUpdateFilter} />}
      >
        <div
          className={`filter ${type && "selected"}`}
          onClick={toggleFilterVisible.bind(null, { type: true })}
        >
          <span className="txt">{type ? FileTypes[type].title : t("type")}</span>
          <ArrowDown className="arrow" />
        </div>
      </Tippy>
      <Tippy
        interactive
        onClickOutside={toggleFilterVisible.bind(null, { date: false })}
        visible={dateVisible}
        placement="bottom-start"
        content={<FilterDate select={filter.date} updateFilter={handleUpdateFilter} />}
      >
        <div
          className={`filter ${date && "selected"}`}
          onClick={toggleFilterVisible.bind(null, { date: true })}
        >
          <span className="txt">{date ? Dates[date].title : t("date")}</span>
          <ArrowDown className="arrow" />
        </div>
      </Tippy>
    </Styled>
  );
}
