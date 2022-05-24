import styled from "styled-components";
const StyledButton = styled.button`
  cursor: pointer;
  padding: 10px 14px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: var(--br, 4px);
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  background-color: #22ccee;
  &.flex {
    width: 100%;
  }
  &:hover,
  &:active {
    background-color: #06aed4;
  }
  &:focus {
    background-color: #22ccee;
  }
  &:disabled {
    background-color: #d0d5dd;
  }
  &.small {
    padding: 8px 14px;
    font-size: 14px;
    line-height: 20px;
  }
  &.mini {
    padding: 4px 10px;
    font-size: 12px;
    line-height: 18px;
  }
  &.danger {
    border: none;
    background-color: #ef4444;
    color: #fff;
    &:disabled {
      background-color: #fecdca;
    }
  }
  &.ghost {
    border: 1px solid #1fe1f9;
    background: none;
    color: #1fe1f9;
  }
  &.border_less {
    box-shadow: none;
    border: none;
  }
  &.cancel {
    border: 1px solid #e5e7eb;
    background: none;
    color: #374151;
  }
`;

export default StyledButton;
