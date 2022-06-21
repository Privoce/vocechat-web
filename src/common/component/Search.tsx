import styled from "styled-components";
import Tippy from "@tippyjs/react";
import searchIcon from "../../assets/icons/search.svg?url";
import addIcon from "../../assets/icons/add.svg?url";
import AddEntriesMenu from "./AddEntriesMenu";
import Tooltip from "./Tooltip";

const StyledWrapper = styled.div`
  position: relative;
  min-height: 56px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  .search {
    display: flex;
    align-items: center;
    gap: 5px;
    .input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .add {
    cursor: pointer;
  }
`;

export default function Search() {
  console.log("searching");
  return (
    <StyledWrapper>
      <div className="search">
        <img src={searchIcon} />
        <input placeholder="Search..." className="input" />
      </div>
      <Tooltip tip="More" placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <img src={addIcon} alt="add icon" className="add" />
        </Tippy>
      </Tooltip>
    </StyledWrapper>
  );
}
