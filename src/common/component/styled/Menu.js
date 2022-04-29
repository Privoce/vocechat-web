import styled from "styled-components";
const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
    0px 10px 10px rgba(31, 41, 55, 0.04);
  border-radius: 12px;
  .item {
    white-space: nowrap;
    cursor: pointer;
    border-radius: 6px;
    padding: 6px 8px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    /* transition: color 0.2s ease; */
    &:hover {
      background-color: #22ccee;
      color: #fff;
    }
    &.underline {
      border-bottom: 1px solid #e5e5e5;
    }
    &.danger {
      color: #a11043;
      &:hover {
        background-color: #b42318;
        color: #fff;
      }
    }
  }
`;

export default StyledMenu;
