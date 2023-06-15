import { FC, ReactElement } from "react";
import Tippy from "@tippyjs/react";

import IconArrow from "@/assets/icons/arrow.right.svg";
import IconChecked from "@/assets/icons/check.sign.svg";

export interface Item {
  title: string;
  icon?: string | ReactElement;
  handler?: (param: any) => void;
  underline?: boolean;
  danger?: boolean;
  checked?: boolean;
  subs?: Item[];
}

interface Props {
  items: Item[];
  hideMenu?: () => void;
}
const WrapWithSubmenu = ({
  items,
  hideMenu,
  child
}: {
  items: Item[];
  hideMenu: () => void | null;
  child: ReactElement;
}) => {
  return (
    <Tippy
      interactive
      placement="right-start"
      trigger="mouseenter focus"
      content={
        <ul className="context-menu">
          {items.map((sub) => {
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
              danger = false,
              checked = false
            } = sub;
            return (
              <li
                className={`item group ${underline ? "bottom_line" : ""} ${danger ? "danger" : ""}`}
                key={title}
                onClick={(evt) => {
                  evt.stopPropagation();
                  evt.preventDefault();
                  if (checked) return;
                  handler(evt);
                  if (hideMenu) {
                    hideMenu();
                  }
                }}
              >
                {icon}
                {title}
                {checked && (
                  <IconChecked className="group-hover:fill-white dark:fill-gray-300 absolute right-2 top-2" />
                )}
              </li>
            );
          })}
        </ul>
      }
    >
      {child}
    </Tippy>
  );
};
const ContextMenu: FC<Props> = ({ items = [], hideMenu = null }) => {
  return (
    <ul className="context-menu">
      {items.map((item) => {
        // if (!item) return null;
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
          danger = false,
          subs = []
        } = item;
        if (subs.length > 0)
          return (
            <WrapWithSubmenu
              items={subs}
              hideMenu={hideMenu}
              child={
                <li
                  className={`item group ${underline ? "bottom_line" : ""} ${
                    danger ? "danger" : ""
                  }`}
                  key={title}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    evt.preventDefault();
                  }}
                >
                  {icon}
                  {title}
                  <IconArrow className="group-hover:fill-white dark:fill-gray-300 absolute right-2 top-2" />
                </li>
              }
            ></WrapWithSubmenu>
          );

        return (
          <li
            className={`item ${underline ? "bottom_line" : ""} ${danger ? "danger" : ""}`}
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
    </ul>
  );
};

export default ContextMenu;
