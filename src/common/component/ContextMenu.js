// import { useRef } from "react";
// import styled from "styled-components";
import StyledMenu from "./styled/Menu";
export default function ContextMenu({ items = [], hideMenu = null }) {
  return (
    <StyledMenu>
      {items.map((item) => {
        if (!item) return null;
        const {
          title,
          icon = null,
          handler = (evt) => {
            evt.preventDefault();
            if (hideMenu) {
              hideMenu();
            }
          },
          underline = false,
          danger = false
        } = item;
        return (
          <li
            className={`item ${underline ? "underline" : ""} ${danger ? "danger" : ""}`}
            key={title}
            onClick={(evt) => {
              evt.stopPropagation();
              evt.preventDefault();
              handler(evt);
              if (hideMenu) {
                hideMenu();
              }
            }}
          >
            {icon}
            {title}
          </li>
        );
      })}
    </StyledMenu>
  );
}
