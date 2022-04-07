import { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";

import searchIcon from "../../assets/icons/search.svg?url";
import addIcon from "../../assets/icons/add.svg?url";
import mailIcon from "../../assets/icons/mail.svg?url";
import Tooltip from "../component/Tooltip";
import ChannelIcon from "./ChannelIcon";
import ChannelModal from "./ChannelModal";
import ContactsModal from "./ContactsModal";

const StyledWrapper = styled.div`
  position: relative;
  min-height: 56px;
  padding: 0 10px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  .search {
    display: flex;
    align-items: center;
    gap: 5px;
    .input {
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
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
export default function Search() {
  const currentUser = useSelector(
    (store) => store.contacts.byId[store.authData.uid]
  );
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
  console.log("searching");
  return (
    <StyledWrapper>
      {channelModalVisible && (
        <ChannelModal personal={isPrivate} closeModal={handleCloseModal} />
      )}
      {contactsModalVisible && (
        <ContactsModal closeModal={toggleContactsModalVisible} />
      )}
      <div className="search">
        <img src={searchIcon} />
        <input placeholder="Search..." className="input" />
      </div>
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
