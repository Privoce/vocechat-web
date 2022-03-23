import styled from "styled-components";
const StyledButton = styled.button`
  cursor: pointer;
  padding: 10px 18px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: var(--br, 4px);
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  background-color: #22ccee;
  &:hover,
  &:active {
    background-color: #06aed4;
  }
  &:focus {
    background-color: #22ccee;
  }
  &:disabled {
    background-color: #a5f0fc;
  }
  &.small {
    padding: 8px 14px;
    font-size: 14px;
    line-height: 20px;
  }
  &.danger {
    border: none;
    background-color: #ef4444;
    color: #fff;
  }
  &.ghost {
    border-color: #1fe1f9;
    background: none;
    color: #1fe1f9;
  }
`;

export default StyledButton;
