import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import addIcon from "../../assets/icons/add.svg?url";
import mailIcon from "../../assets/icons/mail.svg?url";
import Tooltip from "./Tooltip";
import ChannelIcon from "./ChannelIcon";
import ChannelModal from "./ChannelModal";
import ContactsModal from "./ContactsModal";
import { NavLink, useLocation } from "react-router-dom";

const StyledWrapper = styled.div`
  min-height: 56px;
  position: relative;
  padding: 6px 12px;
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
  .popup {
    z-index: 999;
    user-select: none;
    box-shadow: 0px 20px 25px rgba(31, 41, 55, 0.1),
      0px 10px 10px rgba(31, 41, 55, 0.04);
    border-radius: 8px;
    color: #616161;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 4px;
    .item {
      border-radius: 3px;
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      cursor: pointer;
      padding: 10px 8px;
      &:hover {
        background: rgba(116, 127, 141, 0.2);
      }
    }
  }
`;
export default function Server() {
  const { pathname } = useLocation();
  const { currentUser, server, userCount } = useSelector((store) => {
    return {
      userCount: store.contacts.ids.length,
      currentUser: store.contacts.byId[store.authData.uid],
      server: store.server,
    };
  });
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const toggleContactsModalVisible = () => {
    setContactsModalVisible((prevVisible) => {
      if (!prevVisible) {
        hideAll();
      }
      return !prevVisible;
    });
  };
  const handleOpenChannelModal = (isPrivate) => {
    setIsPrivate(isPrivate);
    setChannelModalVisible(true);
    hideAll();
  };
  const handleCloseModal = () => {
    setChannelModalVisible(false);
  };
  // console.log("server info", server);
  const { name, description, logo } = server;
  return (
    <StyledWrapper>
      {channelModalVisible && (
        <ChannelModal personal={isPrivate} closeModal={handleCloseModal} />
      )}
      {contactsModalVisible && (
        <ContactsModal closeModal={toggleContactsModalVisible} />
      )}
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
        <Tippy
          interactive
          placement="bottom-end"
          trigger="click"
          content={
            <ul className="popup">
              {currentUser?.is_admin && (
                <li
                  className="item"
                  onClick={handleOpenChannelModal.bind(null, false)}
                >
                  <ChannelIcon />
                  New Channel
                </li>
              )}
              <li
                className="item"
                onClick={handleOpenChannelModal.bind(null, true)}
              >
                <ChannelIcon personal={true} />
                New Private Channel
              </li>
              <li className="item" onClick={toggleContactsModalVisible}>
                <img src={mailIcon} alt="icon mail" />
                New Message
              </li>
            </ul>
          }
        >
          <img src={addIcon} alt="add icon" className="add" />
        </Tippy>
      </Tooltip>
    </StyledWrapper>
  );
}
