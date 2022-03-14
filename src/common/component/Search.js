import { useState } from "react";
import styled from "styled-components";
import { MdSearch, MdAdd, MdMail } from "react-icons/md";
import { useSelector } from "react-redux";

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
    position: absolute;
    top: 50px;
    right: 8px;
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
  const [popupVisible, setPopupVisible] = useState(false);
  const [channelModalVisible, setChannelModalVisible] = useState(false);
  const [contactsModalVisible, setContactsModalVisible] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const toggleContactsModalVisible = () => {
    if (!contactsModalVisible) {
      togglePopupVisible();
    }
    setContactsModalVisible((prev) => !prev);
  };
  const togglePopupVisible = () => {
    setPopupVisible((prev) => !prev);
  };
  const handleOpenChannelModal = (isPrivate) => {
    setIsPrivate(isPrivate);
    setChannelModalVisible(true);
    togglePopupVisible();
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
        <MdSearch size={20} color="#A1A1AA" />
        <input placeholder="Search..." className="input" />
      </div>
      <MdAdd
        className="add"
        onClick={togglePopupVisible}
        size={24}
        color="#A1A1AA"
      />
      {popupVisible && (
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
            <MdMail size={20} color="#616161" />
            New Message
          </li>
        </ul>
      )}
    </StyledWrapper>
  );
}
