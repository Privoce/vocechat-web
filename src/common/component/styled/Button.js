import styled from "styled-components";
const StyledButton = styled.button`
  cursor: pointer;
  padding: 8px 16px;
  background: none;
  border: 1px solid #e5e7eb;
  box-shadow: 0px 1px 2px rgba(31, 41, 55, 0.08);
  border-radius: var(--br, 4px);
  font-weight: 500;
  color: #374151;
  &.main {
    border: none;
    background: #1fe1f9;
    color: #fff;
  }
  &.danger {
    border: none;
    background: #ef4444;
    color: #fff;
  }
  &.ghost {
    border-color: #1fe1f9;
    background: none;
    color: #1fe1f9;
  }
`;

export default StyledButton;
