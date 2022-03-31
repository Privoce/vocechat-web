// import React from "react";
import styled from "styled-components";
import iconSearch from "../../assets/icons/search.svg?url";
const Styled = styled.div`
  width: 100%;
  padding: 6px 16px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  &.embed {
    padding: 6px 8px;
    box-shadow: none;
  }
  .search {
    outline: none;
    background-color: rgba(0, 0, 0, 0.08);
    border-radius: 25px;
    padding: 10px 8px 10px 36px;
    color: #a1a1aa;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    background-image: url(${iconSearch});
    background-repeat: no-repeat;
    background-position: 8px center;
  }
`;
export default function Search({
  value = "",
  updateSearchValue = null,
  embed = false,
}) {
  const handleChange = (evt) => {
    if (updateSearchValue) {
      updateSearchValue(evt.target.value);
    }
  };
  return (
    <Styled className={embed ? "embed" : ""}>
      <input
        value={value}
        onChange={handleChange}
        className="search"
        placeholder="Search..."
      />
    </Styled>
  );
}
