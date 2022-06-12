import { useState } from "react";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import IconSelect from "../../../assets/icons/check.sign.svg";
import IconArrow from "../../../assets/icons/arrow.down.svg";
import Menu from "./Menu";
const Styled = styled.div`
  user-select: none;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  .txt {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #475467;
    min-width: 76px;
  }
  > .icon {
    width: 20px !important;
    height: 20px !important;
  }
`;
export default function Select({ options = [], updateSelect = null }) {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [curr, setCurr] = useState(undefined);
  const toggleVisible = () => {
    setOptionsVisible((prev) => !prev);
  };
  const handleSelect = (data) => {
    setCurr(data);
    toggleVisible();
    if (updateSelect) {
      updateSelect(data);
    }
  };
  return (
    <Tippy
      trigger="click"
      visible={optionsVisible}
      placement="bottom"
      interactive
      content={
        <Menu>
          {options.map(({ title, value, selected, underline }) => {
            return (
              <li
                onClick={selected ? null : handleSelect.bind(null, { title, value })}
                className={`item sb ${underline ? "underline" : ""}`}
                data-disabled={selected}
                key={value}
              >
                {title}
                {selected && <IconSelect className="icon" />}
              </li>
            );
          })}
        </Menu>
      }
    >
      <Styled onClick={toggleVisible}>
        <span className="txt">{curr?.title || `Select`}</span>
        <IconArrow className="icon" />
      </Styled>
    </Tippy>
  );
}
