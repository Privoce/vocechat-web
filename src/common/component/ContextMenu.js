import { useRef } from "react";
import styled from "styled-components";
import { useOutsideClick } from "rooks";
import StyledMenu from "./StyledMenu";
const StyledWrapper = styled(StyledMenu)`
  z-index: 999;
  position: fixed;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
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
