import { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
const StyledWrapper = styled.ul`
  z-index: 999;
  position: fixed;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
  display: flex;
  flex-direction: column;
  padding: 4px 12px;
  background-color: #fff;
  box-shadow: 0px 20px 25px 20px rgba(31, 41, 55, 0.1),
    0px 10px 10px rgba(31, 41, 55, 0.04);
  border-radius: 6px;
  .item {
    padding: 8px 0;
    /* margin: 0 12px; */
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #616161;
    &.underline {
      border-bottom: 1px solid #e5e5e5;
    }
    &.danger {
      color: #a11043;
    }
  }
`;
export default function ContextMenu({
  posX = 0,
  posY = 0,
  items = [],
  hideMenu,
}) {
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, hideMenu);
  return (
    <StyledWrapper ref={wrapperRef} x={posX} y={posY}>
      {items.map(
        ({
          title,
          handler = (evt) => {
            evt.preventDefault();
            hideMenu();
          },
          underline = false,
          danger = false,
        }) => {
          return (
            <li
              className={`item ${underline ? "underline" : ""} ${
                danger ? "danger" : ""
              }`}
              key={title}
              onClick={handler}
            >
              {title}
            </li>
          );
        }
      )}
    </StyledWrapper>
  );
}
