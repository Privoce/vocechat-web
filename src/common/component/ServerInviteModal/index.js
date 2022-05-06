// import React from 'react'
import styled from "styled-components";
import { useSelector } from "react-redux";
import InviteByEmail from "./InviteByEmail";
import CloseIcon from "../../../assets/icons/close.svg";
const Styled = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0px 25px 50px rgba(31, 41, 55, 0.25);
  border-radius: var(--br);
  padding: 16px;
  min-width: 408px;
  > .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    color: #374151;
    .close {
      cursor: pointer;
    }
  }
`;
import Modal from "../Modal";
export default function ServerInviteModal({ closeModal }) {
  const server = useSelector((store) => {
    return store.server;
  });
  return (
    <Modal>
      <Styled>
        <h2 className="title">
          Invite friends to {server.name}
          <CloseIcon className="close" onClick={closeModal} />
        </h2>
        <InviteByEmail />
      </Styled>
    </Modal>
  );
}
