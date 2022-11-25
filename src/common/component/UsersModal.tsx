import { ChangeEvent, useRef, FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useOutsideClick } from "rooks";
import useFilteredUsers from "../hook/useFilteredUsers";

import User from "./User";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 440px;
  max-height: 402px;
  background: #fff;
  box-shadow: 0 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: 8px;
  transition: all 0.5s ease;
  .search {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
    padding: 8px;
    width: -webkit-fill-available;
    input {
      outline: none;
      width: -webkit-fill-available;
      padding: 8px;
      font-size: 14px;
      line-height: 20px;
      border: none;
    }
  }
  .users {
    display: flex;
    flex-direction: column;
    height: 260px;
    padding: 16px 0;
    overflow-y: scroll;
    .user {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 8px;
      width: -webkit-fill-available;
      &:hover {
        background: rgba(116, 127, 141, 0.1);
      }
      > a {
        width: 100%;
      }
    }
  }
`;

interface Props {
  closeModal: () => void;
}

const UsersModal: FC<Props> = ({ closeModal }) => {
  const { t } = useTranslation("chat");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { users, updateInput, input } = useFilteredUsers();
  useOutsideClick(wrapperRef, closeModal);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    updateInput(evt.target.value);
  };

  return (
    <Modal>
      <StyledWrapper ref={wrapperRef}>
        <div className="search">
          <input value={input} onChange={handleSearch} placeholder={t("search_user_placeholder")} />
        </div>
        {users && (
          <ul className="users">
            {users.map((u) => {
              const { uid = 0 } = u || {};
              return (
                <li key={uid} className="user">
                  <NavLink onClick={closeModal} to={`/chat/dm/${uid}`}>
                    <User uid={uid} interactive={false} />
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </StyledWrapper>
    </Modal>
  );
};

export default UsersModal;
