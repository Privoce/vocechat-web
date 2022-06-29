import { FC, useState } from "react";
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

export interface Option {
  icon?: string;
  title: string;
  value: string;
  selected: boolean;
  underline?: boolean;
}

interface Props {
  options: Option[];
  updateSelect: null | ((option: Partial<Option>) => void);
  current: null | Partial<Option>;
}

const Select: FC<Props> = ({ options = [], updateSelect = null, current = null }) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [curr, setCurr] = useState<Partial<Option> | null>(null);
  const toggleVisible = () => {
    setOptionsVisible((prev) => !prev);
  };
  const handleSelect = (data: Partial<Option>) => {
    setCurr(data);
    toggleVisible();
    if (updateSelect) {
      updateSelect(data);
    }
  };

  return (
    <Tippy
      visible={optionsVisible}
      appendTo={document.body}
      placement="bottom"
      interactive
      content={
        <Menu>
          {options.map(({ title, value, selected, underline }) => {
            return (
              <li
                onClick={selected ? undefined : handleSelect.bind(null, { title, value })}
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
        <span className="txt">{(current !== null ? current : curr)?.title || "Select"}</span>
        <IconArrow className="icon" />
      </Styled>
    </Tippy>
  );
};

export default Select;
