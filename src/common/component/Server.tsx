import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import Tippy from "@tippyjs/react";
import addIcon from "../../assets/icons/add.svg?url";
import Tooltip from "./Tooltip";
import AddEntriesMenu from "./AddEntriesMenu";
import { useAppSelector } from "../../app/store";

const StyledWrapper = styled.div`
  min-height: 56px;
  position: relative;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  /* margin-bottom: 10px; */
  .server {
    display: flex;
    align-items: center;
    gap: 8px;
    .logo {
      width: 32px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      .name {
        font-weight: 700;
        font-size: 14px;
        line-height: 100%;
        color: #374151;
      }
      .desc {
        font-weight: 400;
        font-size: 12px;
        line-height: 100%;
        color: #78787c;
      }
    }
  }
  .add {
    cursor: pointer;
  }
`;

export default function Server() {
  const { pathname } = useLocation();
  const { server, userCount } = useAppSelector((store) => {
    return {
      userCount: store.contacts.ids.length,
      server: store.server
    };
  });
  // console.log("server info", server);
  const { name, description, logo } = server;

  return (
    <StyledWrapper>
      <NavLink to={`/setting?f=${pathname}`}>
        <div className="server">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="info">
            <h3 className="name" title={description}>
              {name}
            </h3>
            <span className="desc">{userCount} members</span>
          </div>
        </div>
      </NavLink>
      <Tooltip tip="More" placement="bottom">
        <Tippy interactive placement="bottom-end" trigger="click" content={<AddEntriesMenu />}>
          <img src={addIcon} alt="add icon" className="add" />
        </Tippy>
      </Tooltip>
    </StyledWrapper>
  );
}
