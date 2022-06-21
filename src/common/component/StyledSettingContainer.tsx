import { FC, ReactElement } from "react";
import styled from "styled-components";
import { useLocation, NavLink } from "react-router-dom";
import backIcon from "../../assets/icons/arrow.left.svg?url";

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  > .left {
    max-height: 100vh;
    overflow: scroll;
    padding: 32px 16px;
    min-width: 212px;
    background-color: #f5f6f7;
    > .title {
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      line-height: 24px;
      color: #1c1c1e;
      margin-bottom: 32px;
      padding-left: 24px;
      background: url(${backIcon});
      background-size: 16px;
      background-repeat: no-repeat;
      background-position: left;
    }
    > .items {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-bottom: 36px;
      &:before {
        padding-left: 12px;
        content: attr(data-title);
        font-weight: bold;
        font-size: 12px;
        line-height: 18px;
        color: #6b7280;
        margin-bottom: 2px;
      }
      .item {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #44494f;
        border-radius: 4px;
        &:hover,
        &.curr {
          background: #e7e5e4;
        }
        > a {
          display: block;
          padding: 4px 12px;
        }
      }
      &.danger .item {
        cursor: pointer;
        padding: 4px 12px;
        color: #ef4444;
        &:hover {
          background: none;
        }
      }
    }
  }
  > .right {
    background-color: #fff;
    width: 100%;
    max-height: 100%;
    /* max-height: -webkit-fill-available; */
    overflow: auto;
    padding: 32px;
    > .title {
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      color: #374151;
      margin-bottom: 32px;
    }
  }
`;

interface Nav {
  name?: string;
  title: string;
  // todo
  items: [];
  component: ReactElement;
}

interface Props {
  closeModal: () => void;
  title?: string;
  navs: Nav[];
  dangers: [];
  nav: Nav;
  children: ReactElement;
}

const StyledSettingContainer: FC<Props> = ({
  closeModal,
  title = "Settings",
  navs = [],
  dangers = [],
  nav,
  children
}) => {
  const { pathname } = useLocation();
  return (
    <StyledWrapper>
      <div className="left">
        <h2 onClick={closeModal} className="title">
          {title}
        </h2>
        {navs.map(({ title, items }) => {
          return (
            <ul key={title} data-title={title} className="items">
              {items.map(({ name, title }) => {
                return (
                  <li key={name} className={`item ${name == nav?.name ? "curr" : ""}`}>
                    <NavLink to={`${pathname}?nav=${name}`}>{title}</NavLink>
                  </li>
                );
              })}
            </ul>
          );
        })}
        {dangers.length ? (
          <ul className="items danger">
            {dangers.map((d) => {
              if (!d) return null;
              const { title, handler } = d;
              return (
                <li key={title} onClick={handler} className="item">
                  {title}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      <div className="right">
        {nav && <h4 className="title">{nav.title}</h4>}
        {children}
      </div>
    </StyledWrapper>
  );
};

export default StyledSettingContainer;
