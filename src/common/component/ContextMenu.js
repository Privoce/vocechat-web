// import { useRef } from "react";
// import styled from "styled-components";
import StyledMenu from "./styled/Menu";
export default function ContextMenu({ items = [], hideMenu }) {
  return (
    <StyledMenu>
      {items.map((item) => {
        if (!item) return null;
        const {
          title,
          icon = null,
          handler = (evt) => {
            evt.preventDefault();
            hideMenu();
          },
          underline = false,
          danger = false,
        } = item;
        return (
          <li
            className={`item ${underline ? "underline" : ""} ${
              danger ? "danger" : ""
            }`}
            key={title}
            onClick={(evt) => {
              handler(evt);
              hideMenu();
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
