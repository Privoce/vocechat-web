// import React from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import { useSelector } from "react-redux";
import { FileTypes } from "./Type";
import Avatar from "../../../common/component/Avatar";
import FilterFrom from "./From";
import FilterChannel from "./Channel";
import FilterType from "./Type";
import ArrowDown from "../../../assets/icons/arrow.down.svg";
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
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
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
  const { contactMap, channelMap } = useSelector((store) => {
    return { contactMap: store.contacts.byId, channelMap: store.channels.byId };
  });
  console.log("maps", contactMap, filter);
  const { from, channel, type } = filter;
  return (
    <Styled>
      <Tippy
        interactive
        placement="bottom-start"
        trigger="click"
        content={
          <FilterFrom select={filter.from} updateFilter={updateFilter} />
        }
      >
        <div className={`filter ${from && "selected"}`}>
          {from && (
            <Avatar
              className="avatar"
              name={contactMap[from].name}
              url={contactMap[from].avatar}
            />
          )}
          <span className="txt">From {from && contactMap[from].name}</span>
          <ArrowDown className="arrow" />
        </div>
      </Tippy>
      <Tippy
        interactive
        placement="bottom-start"
        trigger="click"
        content={
          <FilterChannel select={filter.channel} updateFilter={updateFilter} />
        }
      >
        <div className={`filter ${channel && "selected"}`}>
          <span className="txt">
            {channel ? `In ${channelMap[channel].name}` : `Channel`}
          </span>
          <ArrowDown className="arrow" />
        </div>
      </Tippy>
      <Tippy
        interactive
        placement="bottom-start"
        trigger="click"
        content={
          <FilterType select={filter.type} updateFilter={updateFilter} />
        }
      >
        <div className={`filter ${type && "selected"}`}>
          <span className="txt">{type ? FileTypes[type].title : "Type"}</span>
          <ArrowDown className="arrow" />
        </div>
      </Tippy>
    </Styled>
  );
}
